import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import { SendingMessage } from "./sending-message";

export class Contact extends Model {
}

export function initContact(sequelize: Sequelize) {

 Contact.init(
  {
   name: DataTypes.STRING,
   phone: DataTypes.STRING,
   avatar: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE,
  },
  {
   sequelize,
   modelName: "contacts",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return Contact;
}

export default initContact;
