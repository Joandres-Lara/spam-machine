import { SenderInterface } from "../senders/sender";
import AbstractDriver from "./abstract-driver";
import { DriverInterface } from "./driver";
import SMS77Sender from "@lib/queue/senders/sms-77-sender";

export default class SMSDriver
 extends AbstractDriver
 implements DriverInterface
{
 private sender: SenderInterface;

 constructor() {
  super();
  this.sender = new SMS77Sender();
 }

 initialize(): Promise<void> {
  return this.sender.initialize();
 }

 getSender(): SenderInterface {
  return this.sender;
 }
}
