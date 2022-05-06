import classes from "./fieldset.module.css";
import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function FieldSet({
 children,
 className = "",
 flex = false,
 ...props
}: HTMLAttributes<HTMLFieldSetElement> & {
 flex?: boolean;
}) {
 return (
  <fieldset
   {...props}
   className={join(
    flex ? classes["fieldset--flex"] : classes.fieldset,
    className
   )}
  >
   {children}
  </fieldset>
 );
}
