import classes from "./historical-message.module.css";
import type { ContactModel, MessageModel } from "@bot-messages/util-shared";
import Avatar from "@components/avatar";

export default function HistoricalMessage({
 contact,
 message,
}: {
 contact: Pick<ContactModel, "name" | "avatar">;
 message: MessageModel;
}) {
 return (
  <div className={classes.historical_message}>
   <div className={classes.historical_message__contact_name}>
    {contact.name}
   </div>
   <Avatar />
   <div className={classes.historical_message__message_content}>
    <div className={classes.historical_message__message_content__text}>
     {message.content}
    </div>
    <div className={classes.historical_message__message_content__status}></div>
    <div className={classes.historical_message__message_content__date}></div>
   </div>
  </div>
 );
}
