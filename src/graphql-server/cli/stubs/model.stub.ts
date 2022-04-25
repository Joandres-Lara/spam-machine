import { Model } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize, DataTypes) => {
 class [model-name] extends Model {
   /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
   static associate(models) {
     // define association here
   }
 }

 [model-name].init({
   username: DataTypes.STRING
 }, {
   sequelize,
   modelName: "[model-name]",
 });

 return [model-name];
}
