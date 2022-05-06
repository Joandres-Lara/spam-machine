import { Model, DataTypes, CreationOptional } from "sequelize";
import type { Sequelize } from "sequelize";

export class Contact extends Model {
 declare id: CreationOptional<number>;
 declare name: string;
 declare phone: string;
 declare avatar: string;
 declare created_at: CreationOptional<Date>;
 declare updated_at: CreationOptional<Date>;
 declare user_id: number;
}

export function initContact(sequelize: Sequelize) {

 Contact.init(
  {
   name: DataTypes.STRING,
   phone: DataTypes.STRING,
   avatar: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE,
   user_id: DataTypes.INTEGER
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
