import { Contact, SendingMessage } from "@models";
import { Request, Response } from "express";

export async function get(request: Request, response: Response) {
 await request.can(
  async (user) => {
   const { contact_id } = request.query as { contact_id: string };
   const contact = await Contact.findOne({
    where: {
     user_id: user.id,
     id: contact_id,
    },
   });

   const hasContact = contact !== null && contact !== undefined;

   if (hasContact) {
    request.saveValue("contact", contact);
   }

   return hasContact;
  },
  async () => {
   try {
    const messages_count = await SendingMessage.count({
     where: {
      contact_id: request.contact.id,
     },
    });

    response.send({
     ...request.contact.toJSON(),
     messages_count,
    });
   } catch (e) {
    const error = process.env.NODE_ENV !== "production" ? e : "Server error";
    console.error(error);
    response.status(500).json({ error });
   }
  }
 );
}
