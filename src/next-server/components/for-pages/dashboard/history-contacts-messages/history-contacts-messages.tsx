import useHistoryContactLastMessage from "@hooks/useHistoryMessages";
import HistoricalMessage from "./historical-message";
import classes from "./history-contacts-messages.module.css";

export default function HistoryContactsMessages() {
 const { loading, error, data } = useHistoryContactLastMessage();

 return (
  <div className={classes.history_contacts_messages}>
   <h2 className="text-3xl my-6">Contactos</h2>
   <div className={classes.history_contact_messages__list}>
    {loading && <div>Loading history</div>}
    {error && <div>Error get historical messages</div>}
    {(!data || (data?.length === 0)) && <h1>Todavía no tienes ningún contacto, agrega alguno.</h1>}
    {data?.map(({ name, avatar, lastSendingMessage }, i) => (
     <HistoricalMessage
      key={i}
      contact={{name, avatar}}
      message={lastSendingMessage}
     />
    ))}
   </div>
  </div>
 );
}
