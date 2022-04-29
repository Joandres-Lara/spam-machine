import classes from "./button.module.css";
import { join } from "@bot-messages/util-shared";
import { HTMLAttributes } from "react";

const variants = {
 highlight: classes["button--highlight"],
 default: "",
};

export default function Button({
 children,
 className = "",
 variant = "default",
 ...props
}: HTMLAttributes<HTMLButtonElement> & {
 variant?: "highlight" | "default";
}) {
 return (
  <button
   {...props}
   className={join(classes.button, className, variants[variant] || "")}
  >
   {children}
  </button>
 );
}
