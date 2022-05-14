import { SenderInterface } from "./sender";

export default class FakeSender implements SenderInterface {
 async initialize() {}

 async send(content: string) {
  console.log("Sending: ", content);
  return {
   status: "ok",
   response: "Message sending",
  };
 }
}
