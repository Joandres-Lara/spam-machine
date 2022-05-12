import { User as UserBase, initUser } from "@bot-messages/util-shared-node";
import { Contact } from "./contact-model";

class User extends UserBase {
 static associate() {
  User.hasMany(Contact, {
   foreignKey: "user_id",
  });
 }
}

export { initUser, User };
