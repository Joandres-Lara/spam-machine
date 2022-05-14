import { Request, Response } from "express";
import { Contact, SendingMessage } from "@models";

export async function get(request: Request, response: Response) {
 await request.can(
  async () => true,
  async () => {
   try {
    const historyMessages = await Contact.findAll({
     include: [
      {
       model: SendingMessage,
       as: "last_sending_message",
      },
     ],
     where: {
      user_id: request.user?.id,
     },
     order: [
      [
       {
        model: SendingMessage,
        as: "last_sending_message",
       },
       "sent_on",
       "DESC",
      ],
     ],
    });

    response.json(historyMessages);
   } catch (e) {
    const error = process.env.NODE_ENV !== "production" ? e : "ServerError";
    console.error(error);
    response.status(500).json({ error });
   }
  }
 );
}
