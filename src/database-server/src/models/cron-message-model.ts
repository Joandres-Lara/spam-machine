import {
 Model,
 NonAttribute,
 Association,
 Sequelize,
 DataTypes,
 HasOneGetAssociationMixin,
} from "sequelize";
import { Message } from "./message-model";
import { Contact } from "./contact-model";
import { Cron } from "@bot-messages/util-shared";

export class CronMessage extends Model {
 declare message_id: number;
 declare contact_id: number;
 declare cron_job: Cron;

 declare message?: NonAttribute<Message>;
 declare contact?: NonAttribute<Contact>;

 declare getMessage: HasOneGetAssociationMixin<Message>;
 declare getContact: HasOneGetAssociationMixin<Contact>;

 declare static associations: {
  message: Association<CronMessage, Message>;
  contact: Association<CronMessage, Contact>;
 };

 static associate() {
  CronMessage.belongsTo(Message, {
   foreignKey: "message_id",
  });

  CronMessage.belongsTo(Contact, {
   foreignKey: "contact_id",
  });
 }
}

export function initCronMessage(sequelize: Sequelize) {
 CronMessage.init(
  {
   cron_job: {
    allowNull: false,
    type: DataTypes.JSONB,
   },
  },
  {
   sequelize,
   modelName: "cron_jobs_messages",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return CronMessage;
}

export default initCronMessage;
