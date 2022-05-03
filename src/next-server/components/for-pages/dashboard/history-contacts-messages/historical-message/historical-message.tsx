import classes from "./historical-message.module.css";
import type { ContactModel, MessageModel } from "@bot-messages/util-shared";
import Text from "@components/ui/text/text";
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
   <div className="flex flex-row">
    <div className="w-4/12">
     <Avatar src={contact.avatar} />
    </div>
    <div className="w-8/12 pl-3">
     <div className={classes.historical_message__contact_name}>
      {contact.name}
     </div>
     <Text
      variant={["small", "gray"]}
      className={classes.historical_message__message_content__text}
     >
      {message.content.length > 150
       ? message.content.slice(0, 50) + "..."
       : message.content}
     </Text>
     <div className={classes.historical_message__message_content__status}></div>
     <div className={classes.historical_message__message_content__date}></div>
    </div>
   </div>
   <span className={classes.historical_message__bottom_border} />
  </div>
 );
}
