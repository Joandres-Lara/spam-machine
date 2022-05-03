import { Request, Response } from "express";
import { Contact, SendingMessage } from "@models";

export async function get(request: Request, response: Response) {
 try {
  const historyMessages = await Contact.findAll({
   order: [
    "sending_message.sent_on", "desc"
   ],
   include: SendingMessage
  });
  response.json(historyMessages);
 } catch (e) {
  console.error(e);
  response.status(500).json({ error: e });
 }
}
