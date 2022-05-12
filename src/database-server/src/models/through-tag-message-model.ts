import { Model, Sequelize, DataTypes } from "sequelize";
import { Message } from "./message-model";
import { Tag } from "./tag-model";

export class ThroughTagMessage extends Model {}

export function initThroughTagMessage(sequelize: Sequelize) {
 ThroughTagMessage.init(
  {
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
