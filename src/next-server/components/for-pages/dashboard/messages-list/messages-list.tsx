import classes from "./messages-list.module.css";
import Message from "./message";
import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";
import useSendingMessagesContact from "@hooks/useSendingMessagesContact";
import Link from "next/link";
import { Link as StyledLink } from "@components/ui";

export default function MessagesList() {
 const { contact: selectedContact } = useSelectedHistoryContact();
 const { messages } = useSendingMessagesContact({
  contactId: selectedContact?.id,
 });

 return (
  <div className={classes.messages_list}>
   {selectedContact !== null ? (
    !!messages && messages.length !== 0 ? (
     messages.map((message, i) => <Message key={i} message={message} />)
    ) : (
     <div>
      Todavía no has enviado ningún mensaje a este contacto, configura un
      mensaje desde{" "}
      <Link href="/dashboard/add-message" passHref>
       <StyledLink>aquí</StyledLink>
      </Link>
     </div>
    )
   ) : (
    <div>Selecciona un contacto para ver sus mensajes.</div>
   )}
  </div>
 );
}
