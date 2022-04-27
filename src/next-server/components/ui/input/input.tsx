import classes from "./input.module.css";
import { join } from "@bot-messages/util-shared";
import type { AllHTMLAttributes } from "react";

export default function Input({
 className = "",
 ...props
}: AllHTMLAttributes<HTMLInputElement>) {
 return <input {...props} className={join(classes.input, className)} />;
}
