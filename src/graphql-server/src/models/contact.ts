import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
 class Contact extends Model {
   /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
   static associate(models) {
     // define association here
   }
 }

 Contact.init({
   username: DataTypes.STRING
 }, {
   sequelize,
   modelName: "Contact",
 });

 return Contact;
}
