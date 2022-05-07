import useHistoryContactLastMessage from "@hooks/useHistoryMessages";
import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";
import HistoricalMessage from "./historical-message";
import classes from "./history-contacts-messages.module.css";
import Text from "@components/ui/text";
import StyledLink from "@components/ui/link";
import { useCallback } from "react";
import Link from "next/link";
import { SelectedHistoryContact } from "@interfaces/types";

export default function HistoryContactsMessages() {
 const { loading, error, historyMessages } = useHistoryContactLastMessage();
 const { setContactId } = useSelectedHistoryContact();
 const handleOnSelect = useCallback(
  (contact: SelectedHistoryContact) => () => setContactId(contact.id),
  [setContactId]
 );

 return (
  <div className={classes.history_contacts_messages}>
   <h2 className="text-3xl my-6">Contactos</h2>
   <div className={classes.history_contact_messages__list}>
    {loading && <div>Loading history</div>}
    {error && <div>Error get historical messages</div>}
    {(!historyMessages || historyMessages?.length === 0) && (
     <Text variant="small">
      Todavía no tienes ningún contacto, agrega uno{" "}
      <Link href="/dashboard/add-contact" passHref>
       <StyledLink>aquí</StyledLink>
      </Link>
      ;
     </Text>
    )}
    {historyMessages?.map(({ last_sending_message, ...rest }, i) => (
     <HistoricalMessage
      key={i}
      contact={rest}
      message={last_sending_message}
      onSelect={handleOnSelect(rest)}
     />
    ))}
   </div>
  </div>
 );
}
