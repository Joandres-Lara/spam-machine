import classes from "./form.module.css";
import type { AllHTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";

export default function Form({
 className = "",
 children,
 ...props
}: AllHTMLAttributes<HTMLFormElement>) {
 return (
  <form {...props} className={join(classes.form, className)}>
   {children}
  </form>
 );
}
