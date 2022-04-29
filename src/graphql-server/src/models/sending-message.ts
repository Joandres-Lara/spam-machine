import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
 class SendingMessage extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate() {
   // define association here
  }
 }

 SendingMessage.init(
  {
   username: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "sending_messages",
  }
 );

 return SendingMessage;
};
