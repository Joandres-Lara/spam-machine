import classes from "./input.module.css";
import { join } from "@bot-messages/util-shared";
import type { AllHTMLAttributes, ForwardedRef } from "react";
import { forwardRef } from "react";

export default forwardRef(function Input(
 { className = "", ...props }: AllHTMLAttributes<HTMLInputElement>,
 ref: ForwardedRef<HTMLInputElement>
) {
 return (
  <input
   autoComplete="off"
   {...props}
   className={join(classes.input, className)}
   ref={ref}
  />
 );
});
