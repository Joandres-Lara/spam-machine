import { DriverInterface } from "./driver";
import AbstractDriver from "./abstract-driver";
import { SenderInterface } from "../senders/sender";
import FakeSender from "../senders/fake-sender";

export default class DefaultDriver
 extends AbstractDriver
 implements DriverInterface
{
 private sender: SenderInterface;

 constructor() {
  super();
  this.sender = new FakeSender();
 }

 async initialize(): Promise<void> {

 }

 getSender(): SenderInterface {
  return this.sender;
 }
}
