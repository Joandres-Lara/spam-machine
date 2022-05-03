import classes from "./historical-message.module.css";
import type { ContactModel, MessageModel } from "@bot-messages/util-shared";
import Text from "@components/ui/text/text";
import Avatar from "@components/avatar";
import StyledLink from "@components/ui/link";
import Link from "next/link";

export default function HistoricalMessage({
 contact,
 message,
}: {
 contact: Pick<ContactModel, "name" | "avatar">;
 message: MessageModel | null;
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
     {(message && (
      <>
       <Text
        variant={["small", "gray"]}
        className={classes.historical_message__message_content__text}
       >
        {message.content.length > 150
         ? message.content.slice(0, 50) + "..."
         : message.content}
       </Text>
       <div
        className={classes.historical_message__message_content__status}
       ></div>
       <div className={classes.historical_message__message_content__date}></div>
      </>
     )) || (
      <Text variant={["small", "gray"]}>
       Este contacto todavía no tiene ningún mensaje en cola, agrega uno{" "}
       <Link href="/dashboard/add-message" passHref>
        <StyledLink>aquí</StyledLink>
       </Link>
      </Text>
     )}
    </div>
   </div>
   <span className={classes.historical_message__bottom_border} />
  </div>
 );
}
