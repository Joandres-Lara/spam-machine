import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export class Tag extends Model {
 /**
  * Helper method for defining associations.
  * This method is not a part of Sequelize lifecycle.
  * The `models/index` file will call this method automatically.
  */
 static associate() {
  // define association here
 }
}

export function initTag(sequelize: Sequelize) {
 Tag.init(
  {
   username: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "tags",
  }
 );

 return Tag;
}

export default initTag;
