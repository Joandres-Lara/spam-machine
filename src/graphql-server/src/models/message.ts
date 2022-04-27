import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
 class Message extends Model {
   /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
   static associate(models) {
     // define association here
   }
 }

 Message.init({
   username: DataTypes.STRING
 }, {
   sequelize,
   modelName: "Message",
 });

 return Message;
}
