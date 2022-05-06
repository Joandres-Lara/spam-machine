import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export class Message extends Model {}

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
    allowNull: false
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
