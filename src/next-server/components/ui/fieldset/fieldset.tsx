import classes from "./fieldset.module.css";
import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function FieldSet({
 children,
 className = "",
 ...props
}: HTMLAttributes<HTMLFieldSetElement>) {
 return (
  <fieldset {...props} className={join(classes.fieldset, className)}>
   {children}
  </fieldset>
 );
}
