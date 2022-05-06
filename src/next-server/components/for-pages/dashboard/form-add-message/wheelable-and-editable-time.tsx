import classes from "./form-add-message.module.css";
import {
 KeyboardEvent,
 useCallback,
 useEffect,
 useRef,
 WheelEvent,
} from "react";

function handleCodeKeyBoard(code: string) {
 return !(
  [
   "ControlRight",
   "ControlLeft",
   "Escape",
   "ShiftLeft",
   "ShiftRight",
   "ArrowLeft",
   "ArrowRight",
   "Backspace",
  ].includes(code) ||
  // Functions keys
  code.startsWith("F")
 );
}

export default function WheelableAndEditableTime({
 children,
 onDown,
 onUp,
 onValid = () => false,
 onBlur = () => null,
}: {
 children: string;
 onDown?: () => void;
 onUp?: () => void;
 onBlur?: (value: string) => void;
 onValid?: (value: string) => boolean;
}) {
 const ref = useRef<HTMLDivElement>(null);
 const refLastContent = useRef("");

 const handleOnBlur = useCallback(() => {
  const textContent = ref.current?.textContent || "";
  if (onValid(textContent)) {
   onBlur(textContent);
  } else {
   if(ref.current){
    ref.current.innerHTML = refLastContent.current;
   }
   onBlur(refLastContent.current);
  }
 }, [onBlur, onValid]);

 useEffect(() => {
  if (onValid(children)) {
   refLastContent.current = children;
  }
 }, [children, onValid]);

 return (
  <div
   ref={ref}
   contentEditable
   onBlur={handleOnBlur}
   dangerouslySetInnerHTML={{
    __html: children,
   }}
   className={classes.wheeable_time}
   onWheel={useCallback(
    (e: WheelEvent) => {
     if (e.deltaY / Math.abs(e.deltaY) > 0) {
      onDown && onDown();
     } else {
      onUp && onUp();
     }
    },
    [onDown, onUp]
   )}
  />
 );
}
