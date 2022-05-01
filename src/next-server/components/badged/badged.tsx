import classes from "./badged.module.css";
import { ReactNode } from "react";

export default function Badged({ children } : {children: ReactNode}) {
 return <div className={classes.badged}>{children}</div>;
}
