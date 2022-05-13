import {
 CreationOptional,
 InferAttributes,
 InferCreationAttributes,
 Op,
} from "sequelize";
import { Model, Sequelize, DataTypes } from "sequelize";
import { Message } from "./message-model";
import { Tag } from "./tag-model";

export class ThroughTagMessage extends Model<
 InferAttributes<ThroughTagMessage>,
 InferCreationAttributes<ThroughTagMessage>
> {
 declare id: CreationOptional<number>;
 declare message_id: number;
 declare tag_id: number;

 // TODO: Create a mixin for this.
 static async toggleTags(message_id: number, tags: number[]) {
  const throughTagsMessages = await ThroughTagMessage.findAll({
   where: {
    message_id,
    tag_id: {
     [Op.in]: tags,
    },
   },
  });

  const throughTagsMessagesTagsIds = throughTagsMessages.map(
   ({ tag_id, id }) => ({ tag_id, id })
  );

  const attachs = tags.filter(
   (tag_id) =>
    !throughTagsMessagesTagsIds.some(
     ({ tag_id: existedTagId }) => tag_id === existedTagId
    )
  );

  if (throughTagsMessages.length !== 0) {
   await ThroughTagMessage.destroy({
    where: { id: throughTagsMessagesTagsIds.map(({ id }) => id) },
   });
  } else if (attachs.length !== 0) {
   await ThroughTagMessage.bulkCreate(
    attachs.map((tag_id) => ({
     tag_id,
     message_id,
    }))
   );
  }
 }
}

export function initThroughTagMessage(sequelize: Sequelize) {
 ThroughTagMessage.init(
  {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   message_id: {
    type: DataTypes.INTEGER,
    references: {
     model: Message,
     key: "id",
    },
   },
   tag_id: {
    type: DataTypes.INTEGER,
    references: {
     model: Tag,
     key: "id",
    },
   },
  },
  {
   modelName: "tags_messages",
   sequelize,
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );
}
