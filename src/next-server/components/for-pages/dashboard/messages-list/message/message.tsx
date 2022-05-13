import CheckSvg from "@assets/check.svg";
import CrossSvg from "@assets/cross.svg";
import classes from "./message.module.css";
import { SendingMessage } from "@bot-messages/util-shared";
import { join } from "@bot-messages/util-shared";

export default function Message({ message }: { message: SendingMessage }) {
 const isSuccess = message.response_status === "ok";
 const isError = message.response_status === "error";
 return (
  <div className={classes.message}>
   <div className={classes.message__content}>{message.content.text}</div>
   <div className="flex flex-row justify-between items-center pt-5">
    <div
     className={join(
      classes.message__status,
      isSuccess ? classes["message__status--success"] : "",
      isError ? classes["message__status--error"] : ""
     )}
    >
     {isSuccess && <CheckSvg />}
     {isError && <CrossSvg />}
    </div>
    <div className={classes.message__tags}>
     {message.content.tags.length === 0 && <>Sin etiquetas</>}
     {message.content.tags.map(({ label, color }, i) => (
      <div
       key={i}
       className={classes.message__tag}
       style={{ color: color, borderColor: color }}
      >
       {label}
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
