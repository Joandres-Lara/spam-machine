import classes from "./form.module.css";
import type { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function Form({
 className = "",
 children,
 ...props
}: HTMLAttributes<HTMLFormElement>) {
 return (
  <form {...props} className={join(classes.form, className)}>
   {children}
  </form>
 );
}
