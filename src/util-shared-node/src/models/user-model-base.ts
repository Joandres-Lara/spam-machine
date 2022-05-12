import {
 Model,
 DataTypes,
 Sequelize,
 CreationOptional,
 InferAttributes,
 InferCreationAttributes,
} from "sequelize";
import { genSalt, hash, compare } from "bcrypt";
import { UserModelClass } from "@bot-messages/util-shared";

export class User
 extends Model<InferAttributes<User>, InferCreationAttributes<User>>
 implements UserModelClass
{
 declare id: CreationOptional<number>;
 declare token: string;
 declare username: string;
 declare password: string;
 declare avatar: string;
 declare created_at: CreationOptional<Date>;
 declare updated_at: CreationOptional<Date>;

 validatePassword(password: string) {
  return compare(password, this.password);
 }
}

export function initUser(sequelize: Sequelize) {
 User.init(
  {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
   },
   username: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   password: DataTypes.STRING,
   token: DataTypes.STRING,
   avatar: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE,
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
