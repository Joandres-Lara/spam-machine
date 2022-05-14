import CheckSvg from "@assets/check.svg";
import CrossSvg from "@assets/cross.svg";
import classes from "./historical-message.module.css";
import type { ContactModel, SendingMessage } from "@bot-messages/util-shared";
import Text from "@components/ui/text/text";
import Avatar from "@components/avatar";
import StyledLink from "@components/ui/link";
import Link from "next/link";
import { formatDistance } from "date-fns";

export default function HistoricalMessage({
 contact,
 message,
 onGoToAddMessage,
 onSelect,
}: {
 contact: Pick<ContactModel, "name" | "avatar">;
 message: SendingMessage | null;
 onGoToAddMessage?: () => void;
 onSelect?: () => void;
}) {
 return (
  <div className={classes.historical_message} onClick={onSelect}>
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
        {message.content.text.length > 75
         ? message.content.text.slice(0, 75) + "..."
         : message.content.text}
       </Text>
       <Text variant="gray" className="flex flex-row justify-between py-2 px-3">
        <div className={classes.historical_message__message_content__status}>
         {message.response_status === "ok" ? (
          <div className="flex flex-row items-center">
           Enviado
           <CheckSvg />
          </div>
         ) : (
          <>
           No enviado
           <CrossSvg />
          </>
         )}
        </div>
        <div className={classes.historical_message__message_content__date}>
         {formatDistance(new Date(message.sent_on), new Date())}
        </div>
       </Text>
      </>
     )) || (
      <Text variant={["small", "gray"]}>
       Este contacto todavía no tiene ningún mensaje en cola, agrega uno{" "}
       <Link href="/dashboard/add-message" onClick={onGoToAddMessage} passHref>
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
