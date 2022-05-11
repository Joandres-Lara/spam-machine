import { forwardRef, ForwardedRef, AnchorHTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";
import classes from "./link.module.css";

const variants = {
 small: classes["link--small"],
 default: "",
};

export default forwardRef(function Link(
 {
  children,
  className = "",
  variant = "default",
  ...props
 }: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "small" | "default";
 },
 ref: ForwardedRef<HTMLAnchorElement>
) {
 return (
  <a
   {...props}
   className={join(classes.link, className, variants[variant] || "")}
   ref={ref}
  >
   {children}
  </a>
 );
});
