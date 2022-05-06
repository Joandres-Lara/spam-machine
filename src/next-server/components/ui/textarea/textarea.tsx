import classes from "./textarea.module.css";
import { join } from "@bot-messages/util-shared";
import { ForwardedRef, forwardRef, TextareaHTMLAttributes } from "react";

export default forwardRef(function TextArea(
 { className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>,
 ref: ForwardedRef<HTMLTextAreaElement>
) {
 return (
  <textarea
   {...props}
   className={join(className, classes.textarea)}
   ref={ref}
  />
 );
});
