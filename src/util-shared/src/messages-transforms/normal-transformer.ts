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
// TODO: maybe transform this in a class
export default function normalTransformer(
 text: string,
 config: { contact: ContactModel, at: Date, user: UserModel }
) {
 for (const key of keys) {
  const [root, root_key] = key
   .replace("[:", "")
   .replace("]", "")
   .split(".") as ["contact" | "at" | "user", string];

  let value;

  if(root === "contact"){
   value = config.contact[root_key as keyof ContactModel];
  } else if(root === "user"){
   value = config.user[root_key as keyof UserModel];
  } else if(root === "at"){
   value = config.at;
  }

  text = text.replace(key, _v(value));
 }

 return text;
}
