import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import { genSalt, hash, compare } from "bcrypt";
import { UserModel } from "../../exposure/model-types";

class User extends Model<
 UserModel,
 Omit<UserModel, "created_at" | "updated_at">
> {
 password!: string;
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

export default function initializeUser(sequelize: Sequelize): typeof User {
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
