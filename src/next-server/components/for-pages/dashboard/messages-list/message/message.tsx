import classes from "./message.module.css";
import { SendingMessage } from "@bot-messages/util-shared";

export default function Message({ message }: { message: SendingMessage }) {
 return (
  <div className={classes.message}>
   <div className={classes.message__content}>
    {message.content}
   </div>
  </div>
 );
}
