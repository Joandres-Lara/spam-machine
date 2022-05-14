import { SenderInterface, SenderResult } from "./sender";

export default class SMS77Sender implements SenderInterface {
 async initialize() {}

 async send(content: string, to?: string | undefined) {
  return {
   status: "ok",
   response: "Seding message " + content,
  };
 }
}
