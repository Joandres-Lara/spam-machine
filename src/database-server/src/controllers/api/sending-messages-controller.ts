import { Contact, SendingMessage } from "@models";
import { Request, Response } from "express";

export async function get(request: Request, response: Response) {
 await request.can(
  async () => {
   const { contact_id } = request.query;
   return (
    (await Contact.findOne({
     where: {
      user_id: request.user?.id,
      id: contact_id,
     },
    })) !== null
   );
  },
  async () => {
   const { contact_id } = request.query;
   const messages_sending = await SendingMessage.findAll({
    where: {
     contact_id,
    },
   });

   response.json(messages_sending);
  }
 );
}
