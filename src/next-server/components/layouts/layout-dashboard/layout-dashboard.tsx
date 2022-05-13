import PlusSvg from "@assets/plus.svg";
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
    <div className="w-3/4 ml-10 relative">{gridRight}</div>
   </div>
   <div className={classes.layout_dashboard__buttons}>
    <button
     className={classes.layout_dashboard__button_add_contact}
     onClick={() => router.push("/dashboard/add-contact")}
    >
     <div>
      <PlusSvg />
      Agregar contacto
     </div>
    </button>
    <button
     className={classes.layout_dashboard__button_add_message}
     onClick={() => router.push("/dashboard/add-message")}
    >
     <div>
      <PlusSvg />
      Agregar mensaje
     </div>
    </button>
   </div>
  </div>
 );
}
