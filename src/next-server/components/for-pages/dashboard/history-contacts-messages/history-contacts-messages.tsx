import HistoricalMessage from "./historical-message";
import classes from "./history-contacts-messages.module.css";

export default function HistoryContactsMessages() {
 const historicalMessages = Array(10).fill({
  contact: {
   name: "Joan Andrés Lara Mora",
   avatar: "/avatars/default-avatar.png",
  },
  message: {
   sending_to: new Date(),
   content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tempor massa, quis fringilla est. Vestibulum in quam vel sapien eleifend volutpat. Etiam mollis massa at nunc consectetur, vel tincidunt augue convallis.",
   status: "Ok",
  },
 });

 return (
  <div className={classes.history_contacts_messages}>
   <h2 className="text-3xl my-6">Contactos</h2>
   <div className={classes.history_contact_messages__list}>
    {historicalMessages.map(({ message, contact }, i) => (
     <HistoricalMessage key={i} contact={contact} message={message} />
    ))}
   </div>
  </div>
 );
}
