import useHistoryContactLastMessage from "@hooks/useHistoryMessages";
import HistoricalMessage from "./historical-message";
import classes from "./history-contacts-messages.module.css";
import Text from "@components/ui/text";
import StyledLink from "@components/ui/link";
import Link from "next/link";

export default function HistoryContactsMessages() {
 const { loading, error, data } = useHistoryContactLastMessage();

 return (
  <div className={classes.history_contacts_messages}>
   <h2 className="text-3xl my-6">Contactos</h2>
   <div className={classes.history_contact_messages__list}>
    {loading && <div>Loading history</div>}
    {error && <div>Error get historical messages</div>}
    {(!data || data?.length === 0) && (
     <Text variant="small">
      Todavía no tienes ningún contacto, agrega uno{" "}
      <Link href="/dashboard/add-contact" passHref>
       <StyledLink>aquí</StyledLink>
      </Link>
      ;
     </Text>
    )}
    {data?.map(({ name, avatar, lastSendingMessage }, i) => (
     <HistoricalMessage
      key={i}
      contact={{ name, avatar }}
      message={lastSendingMessage}
     />
    ))}
   </div>
  </div>
 );
}
