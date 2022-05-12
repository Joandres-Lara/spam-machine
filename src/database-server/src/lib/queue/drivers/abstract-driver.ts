import { Cron } from "@bot-messages/util-shared";
import { Sender } from "@lib/queue/senders/sender";
import { scheduleJob } from "node-schedule";
import { DriverCallbackFilled } from "./driver";
import parseCron from "@lib/queue/util/parse-cron";

export default abstract class AbstractDriver {
 getSender(): Sender {
  throw new Error("Sender canot be configurated");
 }

 async queue(
  cron: Cron,
  content: string,
  to: string,
  onFilled: DriverCallbackFilled
 ) {
  scheduleJob(parseCron(cron), async () => {
   const response = await this.getSender().send(content, to);
   await onFilled(response);
  });
 }
}
