import { Request, Response } from "express";
import { Contact, LastSendingMessage } from "@models";

export async function get(request: Request, response: Response) {
 await request.can(
  async () => true,
  async () => {
   try {
    const historyMessages = await Contact.findAll({
     include: ["last_sending_message"],
     where: {
      user_id: request.user?.id,
     },
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