import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
 class Tag extends Model {
   /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
   static associate() {
     // define association here
   }
 }

 Tag.init({
   username: DataTypes.STRING
 }, {
   sequelize,
   modelName: "Tag",
 });

 return Tag;
}
