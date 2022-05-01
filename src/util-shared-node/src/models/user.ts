import {
 Model,
 DataTypes,
 Sequelize,
 CreationOptional,
} from "sequelize";
import { genSalt, hash, compare } from "bcrypt";
import { UserModelClass } from "@bot-messages/util-shared";

export class User
 extends Model
 implements UserModelClass
{
 declare id: CreationOptional<number>;
 declare username: string;
 declare password: string;
 declare avatar: string;
 declare created_at: CreationOptional<Date>;
 declare updated_at: CreationOptional<Date>;
 /**
  * Helper method for defining associations.
  * This method is not a part of Sequelize lifecycle.
  * The `models/index` file will call this method automatically.
  */
 static associate() {
  // define association here
 }

 validatePassword(password: string) {
  return compare(password, this.password);
 }
}

export function initUser(sequelize: Sequelize) {
 User.init(
  {
   username: DataTypes.STRING,
   password: DataTypes.STRING,
   avatar: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "user",
   createdAt: "created_at",
   updatedAt: "updated_at",
   hooks: {
    async beforeCreate(user) {
     const salt = await genSalt(10);
     user.password = await hash(user.password, salt);
    },
    async beforeUpdate(user) {
     if (user.password) {
      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);
     }
    },
   },
  }
 );

 return User;
}
