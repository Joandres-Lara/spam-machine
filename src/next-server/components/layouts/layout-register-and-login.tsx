import classes from "./layout-register-and-login.module.css";
import { join } from "@bot-messages/util-shared";
import type { ReactNode } from "react";

interface RegisterProps {
 focusIndicatorLogin?: boolean;
 focusIndicatorRegister?: boolean;
 register?: ReactNode;
 login?: ReactNode;
}

export default function RegisterAndLogin({
 focusIndicatorLogin = false,
 focusIndicatorRegister = false,
 register = null,
 login = null,
}: RegisterProps) {
 return (
  <div className="min-h-screen min-w-screen flex justify-center">
   <div className="lg:w-2/5 w-11/12">
    {/* Heads */}
    <div className="flex flex-row justify-center items-center">
     <div className="w-1/2">
      <h1
       className={join(
        classes.head_section,
        focusIndicatorRegister ? classes["head_section--focus"] : ""
       )}
      >
       Registrar
      </h1>
     </div>
     <div className="w-1/2">
      <h2
       className={join(
        classes.head_section,
        focusIndicatorLogin ? classes["head_section--focus"] : ""
       )}
      >
       Iniciar sesión
      </h2>
     </div>
    </div>
    {/* Contents */}
    <div className="flex lg:flex-row flex-col justify-center items-center border border-gray rounded-lg h-full overflow-hidden my-5">
     <div className="lg:w-1/2 w-full h-full">{register}</div>
     <div className="lg:w-1/2 w-full h-full">{login}</div>
    </div>
   </div>
  </div>
 );
}
