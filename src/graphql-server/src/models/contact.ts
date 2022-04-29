import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
 class Contact extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
   // define association here
  }
 }

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
   modelName: "contact",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return Contact;
};
