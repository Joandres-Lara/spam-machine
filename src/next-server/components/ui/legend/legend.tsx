import classes from "./legend.module.css";
import { join } from "@bot-messages/util-shared";
import { HTMLAttributes } from "react";

export default function Legend({
 children,
 className = "",
 ...props
}: HTMLAttributes<HTMLLegendElement>) {
 return (
  <legend {...props} className={join(classes.legend, className)}>
   {children}
  </legend>
 );
}
