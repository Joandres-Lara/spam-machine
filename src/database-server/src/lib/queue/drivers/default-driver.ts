import { DriverInterface } from "./driver";
import AbstractDriver from "./abstract-driver";
import { Sender } from "../senders/sender";
import FakeSender from "../senders/fake-sender";

export default class DefaultDriver
 extends AbstractDriver
 implements DriverInterface
{
 private sender: Sender;

 constructor() {
  super();
  this.sender = new FakeSender();
 }

 async initialize(): Promise<void> {

 }

 getSender(): Sender {
  return this.sender;
 }
}
