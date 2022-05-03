import classes from "./legend.module.css";
import { join } from "@bot-messages/util-shared";
import { HTMLAttributes } from "react";

const variants = {
 md: classes.legend_medium,
 default: "",
};

export default function Legend({
 children,
 className = "",
 variant = "default",
 ...props
}: HTMLAttributes<HTMLLegendElement> & {
 variant?: "md" | "default";
}) {
 return (
  <legend
   {...props}
   className={join(classes.legend, className, variants[variant] || "")}
  >
   {children}
  </legend>
 );
}
