import classes from "./error.module.css";
import { join } from "@bot-messages/util-shared";
import { HTMLAttributes } from "react";

export default function Error({
 className = "",
 children,
 ...rest
}: HTMLAttributes<HTMLDivElement>) {
 return (
  <div {...rest} className={join(className, classes.error)}>
   {children}
  </div>
 );
}
