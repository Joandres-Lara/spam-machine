import {
 Model,
 DataTypes,
 CreationOptional,
 NonAttribute,
 BelongsToManyGetAssociationsMixin,
} from "sequelize";
import { Sequelize } from "sequelize";
import { Contact } from "./contact-model";
import { CronMessage } from "./cron-message-model";
import { Tag } from "./tag-model";
import { ThroughTagMessage } from "./through-tag-message-model";

export class Message extends Model {
 declare id: CreationOptional<number>;
 declare content: {
  text: string;
  format: "normal";
 };

 declare type: "sms";

 declare is_default: CreationOptional<boolean>;

 declare created_at: CreationOptional<Date>;
 declare updated_at: CreationOptional<Date>;

 declare contact: NonAttribute<Contact>;
 declare tags: NonAttribute<Tag[]>;

 declare getContact: BelongsToManyGetAssociationsMixin<Contact>;
 declare getTags: BelongsToManyGetAssociationsMixin<Tag>;

 static associate() {
  Message.belongsToMany(Contact, {
   through: CronMessage,
   as: "message_contacts",
   foreignKey: "message_id",
  });

  // TODO: Change alias to "cron_messages"
  Message.hasMany(CronMessage, {
   as: "cron_message",
   foreignKey: "message_id",
  });

  // TODO: Set as alias "tags"
  Message.belongsToMany(Tag, {
   through: ThroughTagMessage,
   foreignKey: "message_id",
  });
 }
}

export function initMessage(sequelize: Sequelize) {
 Message.init(
  {
   content: {
    type: DataTypes.JSONB,
    allowNull: false,
   },
   type: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
   },
   created_at: {
    type: DataTypes.DATE,
    allowNull: false,
   },
   updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
   },
  },
  {
   sequelize,
   modelName: "messages",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return Message;
}

export default initMessage;
