import classes from "./layout-register-and-login.module.css";
import Link from "next/link";
import { join } from "@bot-messages/util-shared";
import type { ReactNode } from "react";
import IndicatorFocus from "@components/for-pages/signin/indicator-focus/indicator-focus";

interface RegisterProps {
 focusIndicatorLogin?: boolean;
 focusIndicatorRegister?: boolean;
 registerSection?: ReactNode;
 loginSection?: ReactNode;
}

export default function LayoutRegisterAndLogin({
 focusIndicatorLogin = false,
 focusIndicatorRegister = false,
 registerSection = null,
 loginSection = null,
}: RegisterProps) {
 return (
  <div className="min-h-screen min-w-screen flex justify-center">
   <div className="lg:w-2/5 w-11/12">
    {/* Heads */}
    <div className="flex flex-row justify-center items-center">
     <div className="w-1/2">
      <Link href="/register">
       <h1
        className={join(
         classes.head_section,
         focusIndicatorRegister ? classes["head_section--focus"] : ""
        )}
       >
        Registrar
       </h1>
      </Link>
      {focusIndicatorRegister && <IndicatorFocus />}
     </div>
     <div className="w-1/2">
      <Link href="/sign-in">
       <h2
        className={join(
         classes.head_section,
         focusIndicatorLogin ? classes["head_section--focus"] : ""
        )}
       >
        Iniciar sesión
       </h2>
      </Link>
      {focusIndicatorLogin && <IndicatorFocus />}
     </div>
    </div>
    {/* Contents */}
    <div className="flex lg:flex-row flex-col justify-center items-center border border-gray rounded-lg h-full overflow-hidden my-5">
     <div className="lg:w-1/2 w-full h-full">{registerSection}</div>
     <div className="lg:w-1/2 w-full h-full">{loginSection}</div>
    </div>
   </div>
  </div>
 );
}
