import classes from "./success.module.css";
import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function Success({
 className = "",
 children,
 ...rest
}: HTMLAttributes<HTMLDivElement>) {
 return (
  <div {...rest} className={join(className, classes.success)}>
   {children}
  </div>
 );
}
