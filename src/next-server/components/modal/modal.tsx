import classes from "./modal.module.css";
import { HTMLAttributes, useCallback, useEffect } from "react";
import { join } from "@bot-messages/util-shared";
import CrossSvg from "@assets/cross.svg";

interface ModalProps {
 open?: boolean;
 onClose?: () => void;
 classNameContent?: string;
}

export default function Modal({
 className = "",
 children,
 open = false,
 onClose,
 classNameContent = "",
 ...props
}: HTMLAttributes<HTMLDivElement> & ModalProps) {
 const handleKeyEsc = useCallback(
  (e: KeyboardEvent) => {
   if (e.key === "Escape") {
    onClose && onClose();
   }
  },
  [onClose]
 );

 useEffect(() => {
  document.addEventListener("keyup", handleKeyEsc);
  return () => {
   document.removeEventListener("keyup", handleKeyEsc);
  };
 }, [handleKeyEsc]);

 useEffect(() => {
  document.body.classList.add("modal_open");
  return () => {
   document.body.classList.remove("modal_open");
  };
 }, [open]);

 return (
  <div
   {...props}
   className={join(classes.modal, className, open ? classes.modal_open : "")}
  >
   <div className={classes.modal__backdrop}></div>
   <div className={classes.modal__body}>
    <div className={join(classes.modal__content, classNameContent)}>
     <div className={classes.modal__dismiss} onClick={onClose}>
      <CrossSvg />
     </div>
     {children}
    </div>
   </div>
  </div>
 );
}
