import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export class SendingMessage extends Model {}

export function initSendingMessage(sequelize: Sequelize) {
 SendingMessage.init(
  {
   content: DataTypes.JSONB,
   sent_on: DataTypes.DATE,
   response_status: DataTypes.STRING,
   response_content: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "sending_messages",
   createdAt: false,
   updatedAt: false,
  }
 );

 return SendingMessage;
}

export default initSendingMessage;
