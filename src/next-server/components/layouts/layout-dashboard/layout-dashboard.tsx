import { ReactNode } from "react";
import classes from "./layout-dashboard.module.css";

export default function LayoutDashboard({
 gridRight = null,
 gridLeft = null,
}: {
 gridRight: ReactNode;
 gridLeft: ReactNode;
}) {
 return (
  <div className={classes.layout_dashboard}>
   <div className={classes.layout_dashboard__content}>
    <div className="w-1/4">{gridLeft}</div>
    <div className="w-3/4 pl-10">{gridRight}</div>
   </div>
   <div className={classes.layout_dashboard__buttons}>
    <button className="bg-main text-white">Agregar contacto</button>
    <button className="bg-whiter text-main">Agregar mensaje</button>
   </div>
  </div>
 );
}
