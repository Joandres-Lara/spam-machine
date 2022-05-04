import { SendingMessage } from "@bot-messages/util-shared";
import fetchWrapper from "@lib/fetch-wrapper";
import classes from "./messages-list.module.css";
import Message from "./message";
import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";
import { useQuery } from "react-query";
import apiURL from "@lib/api-url";

export default function MessagesList() {
 const selectedContact = useSelectedHistoryContact();
 const {
  data: messages,
  isLoading,
  isError,
 } = useQuery(
  "messages-list",
  () =>
   fetchWrapper({
    url: apiURL(`/messages/${selectedContact?.id}`),
    method: "GET",
   }),
  {
   enabled: !!selectedContact?.id,
  }
 );

 console.log({ selectedContact, messages });

 return (
  <div className={classes.messages_list}>
   {selectedContact !== null ? (
    messages.map((message, i) => <Message key={i} message={message} />)
   ) : (
    <>Selecciona un contacto para ver sus mensajes.</>
   )}
  </div>
 );
}
