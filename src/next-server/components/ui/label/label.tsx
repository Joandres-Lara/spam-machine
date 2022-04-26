import classes from "./label.module.css";
import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function Label({
 children,
 className = "",
 ...props
}: HTMLAttributes<HTMLLabelElement>) {
 return (
  <label {...props} className={join(classes.label, className)}>
   {children}
  </label>
 );
}
