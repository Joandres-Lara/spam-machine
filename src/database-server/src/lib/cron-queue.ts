import { CronMessage } from "@models";
import QueueManager from "@lib/queue/queue-manager";

export default async function cronQueue(cronMessage: CronMessage) {
 const manager = await QueueManager.init();
 const { cron_job } = cronMessage;
 const message = await cronMessage.getMessage();
 const contact = await cronMessage.getContact();
 const user = await contact.getUser();
 return manager.queue(message.type, cron_job, message, contact, user);
}
