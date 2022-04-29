import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default function initializeUser(sequelize: Sequelize): typeof Model {
 class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: []) {
   // define association here
  }
 }

 User.init(
  {
   username: DataTypes.STRING,
   password: DataTypes.STRING,
   avatar: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE,
  },
  {
   sequelize,
   modelName: "user",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return User;
}
