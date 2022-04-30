import { SendingMessage } from "@bot-messages/util-shared";
import classes from "./messages-list.module.css";
import Message from "./message";

export default function MessagesList() {
 const messages = Array(10).fill({
  content:
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tempor massa, quis fringilla est. Vestibulum in quam vel sapien eleifend volutpat. Etiam mollis massa at nunc consectetur, vel tincidunt augue convallis.",
  sent_on: new Date(),
  response_status: "Ok",
  response_content: "Sending message",
 } as SendingMessage);

 return (
  <div className={classes.messages_list}>
   {messages.map((message, i) => (
    <Message key={i} message={message} />
   ))}
  </div>
 );
}
