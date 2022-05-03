import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export class Message extends Model {
}

export function initMessage(sequelize: Sequelize){
 Message.init({
   content: DataTypes.STRING,
   type: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE
 }, {
   sequelize,
   modelName: "messages",
   createdAt: "created_at",
   updatedAt: "updated_at"
 });

 return Message;
}

export default initMessage
