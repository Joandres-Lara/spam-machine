import { ContactModel, UserModel } from "../model-types";
import { keys } from "./valid-keys-transform";
import { format } from "date-fns";

function _v(v: unknown): string {
 if (typeof v !== "string") {
  if (typeof v === "number") {
   return v.toString();
  } else if (v instanceof Date) {
   return format(v, "pppp");
  } else {
   throw new Error("Invalid type value");
  }
 }
 return v;
}

type ContactModelTransformer = Pick<ContactModel, "name">;
type UserModelTransformer = Pick<UserModel, "username">;
// TODO: maybe transform this in a class
export default function normalTransformer(
 text: string,
 config: {
  contact: ContactModelTransformer;
  at: Date;
  user: UserModelTransformer;
 }
) {
 for (const key of keys) {
  const [root, root_key] = key
   .replace("[:", "")
   .replace("]", "")
   .split(".") as ["contact" | "at" | "user", string];

  let value;

  if (root === "contact") {
   value = config.contact[root_key as keyof ContactModelTransformer];
  } else if (root === "user") {
   value = config.user[root_key as keyof UserModelTransformer];
  } else if (root === "at") {
   value = config.at;
  }

  text = text.replace(key, _v(value));
 }

 return text;
}
