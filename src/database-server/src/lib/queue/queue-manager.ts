import { Cron, normalTransformer } from "@bot-messages/util-shared";
import { Contact, Message, SendingMessage, User } from "@models";
import DefaultDriver from "./drivers/default-driver";
import SMSDriver from "./drivers/sms-driver";
import { DriverInterface } from "./drivers/driver";

export default class QueueManager {
 private static instance: QueueManager;

 static async init() {
  if (!QueueManager.instance) {
   const instance = (QueueManager.instance = new QueueManager());
   await instance.initialize();
  }
  return QueueManager.instance;
 }

 static getInstance() {
  return QueueManager.instance;
 }

 // TODO: In the future #drivers can be value can be DriverInterface[]
 // for more senders to same key use.
 #drivers: Record<string, DriverInterface> = {};

 constructor() {
  this.#drivers = {
   fallback: new DefaultDriver(),
   sms: new SMSDriver()
  };
 }

 async initialize() {
  return await Promise.all(
   Object.values(this.#drivers).map((driver) => {
    return driver.initialize();
   })
  );
 }

 async queue(
  messageType: string,
  cron: Cron,
  message: Message,
  contact: Contact,
  user: User
 ) {
  // TODO: Refactor using a class transformer
  const messageText = normalTransformer(message.content.text, {
   contact,
   // Default value by user
   user,
   at: new Date(),
  });

  const contactNumber = contact.phone;
  const tags = (await message.getTags()).map(({ label, color }) => ({
   label,
   color,
  }));

  if (!(messageType in this.#drivers)) {
   // Default driver
   messageType = "fallback";
  }

  return this.#drivers[messageType].queue(
   cron,
   messageText,
   contactNumber,
   async ({ status, response }) => {
    if (status === "ok") {
     await SendingMessage.create({
      contact_id: contact.id,
      content: {
       text: messageText,
       tags,
      },
      response_status: "ok",
      response_content: response,
     });
    }
   }
  );
 }
}
