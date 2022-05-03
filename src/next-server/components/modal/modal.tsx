import classes from "./modal.module.css";
import { HTMLAttributes } from "react";
import { join } from "@bot-messages/util-shared";
import CrossSvg from "@assets/cross.svg";

interface ModalProps {
 open?: boolean;
 onClose?: () => void;
}

export default function Modal({
 className = "",
 children,
 open = false,
 onClose,
 ...props
}: HTMLAttributes<HTMLDivElement> & ModalProps) {
 return (
  <div
   {...props}
   className={join(classes.modal, className, open ? classes.modal_open : "")}
  >
   <div className={classes.modal__backdrop}></div>
   <div className={classes.modal__content}>
    <div className={classes.modal__dismiss} onClick={onClose}>
     <CrossSvg/>
    </div>
    {children}
   </div>
  </div>
 );
}
