import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";
import classes from "./text.module.css";

const variants = {
 small: classes["text--small"],
 gray: classes["text--gray"],
};

type KeysVariants = "small" | "gray";
type VariantType = KeysVariants | KeysVariants[];

function reduceVariant(variant: VariantType) {
 if (typeof variant === "string") {
  return variants[variant] || "";
 } else if (Array.isArray(variant)) {
  return join(...variant.map((current) => variants[current] || ""));
 }
}

export default function Text({
 children,
 variant,
 className = "",
 ...props
}: HTMLAttributes<HTMLParagraphElement> & { variant?: VariantType }) {
 return (
  <p
   {...props}
   className={join(classes.text, className, reduceVariant(variant) || "")}
  >
   {children}
  </p>
 );
}
