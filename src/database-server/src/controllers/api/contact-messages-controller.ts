import { Contact, SendingMessage } from "@models";
import { Request, Response } from "express";
import { Sequelize } from "sequelize";

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
    const contact = request.contact as Contact;
    const messages_count = await SendingMessage.findOne({
     attributes: {
      include: [
       [
        Sequelize.fn("COUNT", Sequelize.col("sending_messages.id")),
        "messages_count",
       ],
      ],
     },
     where: {
      contact_id: (request.contact as Contact).id,
     },
     group: ["contact_id", "sending_messages.id"],
    });

    console.log({ messages_count });

    response.send({
     ...contact.toJSON(),
     messages_count: 0,
    });
   } catch (e) {
    const error = process.env.NODE_ENV !== "production" ? e : "Server error";
    console.log(error);
    response.status(500).json({ error });
   }
  }
 );
}
