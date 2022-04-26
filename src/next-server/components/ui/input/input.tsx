import classes from "./input.module.css";
import { join } from "@bot-messages/util-shared";
import type { HTMLAttributes } from "react";

export default function Input({
 className = "",
 ...props
}: HTMLAttributes<HTMLInputElement>) {
 return <input {...props} className={join(classes.input, className)} />;
}
