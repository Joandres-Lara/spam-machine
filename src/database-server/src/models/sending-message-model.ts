import {
 Model,
 DataTypes,
 CreationOptional,
 NonAttribute,
 HasOneGetAssociationMixin,
} from "sequelize";
import type { Sequelize } from "sequelize";
import { Contact } from "./contact-model";

export class SendingMessage extends Model {
 declare sent_on: CreationOptional<Date>;
 declare response_status: string;
 declare response_content: string;
 declare content: {
  text: string;
  tags: string[];
 };

 declare contact?: NonAttribute<Contact>;

 declare getContact: HasOneGetAssociationMixin<Contact>;

 static associate() {
  SendingMessage.belongsTo(Contact, {
   foreignKey: "contact_id",
  });
 }
}

export function initSendingMessage(sequelize: Sequelize) {
 SendingMessage.init(
  {
   content: {
    type: DataTypes.JSONB,
    allowNull: false
   },
   sent_on: DataTypes.DATE,
   response_status: DataTypes.STRING,
   response_content: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "sending_messages",
   createdAt: "sent_on",
   updatedAt: false,
  }
 );

 return SendingMessage;
}

export default initSendingMessage;
