import { ReactNode } from "react";
import { useRouter } from "next/router";
import classes from "./layout-dashboard.module.css";

export default function LayoutDashboard({
 gridRight = null,
 gridLeft = null,
}: {
 gridRight: ReactNode;
 gridLeft: ReactNode;
}) {
 const router = useRouter();

 return (
  <div className={classes.layout_dashboard}>
   <div className={classes.layout_dashboard__content}>
    <div className="w-1/4">{gridLeft}</div>
    <div className="w-3/4 pl-10">{gridRight}</div>
   </div>
   <div className={classes.layout_dashboard__buttons}>
    <button
     className="bg-main text-white"
     onClick={() => router.push("/dashboard/add-contact")}
    >
     Agregar contacto
    </button>
    <button
     className="bg-variant-1 text-white"
     onClick={() => router.push("/dashboard/add-message")}
    >
     Agregar mensaje
    </button>
   </div>
  </div>
 );
}
