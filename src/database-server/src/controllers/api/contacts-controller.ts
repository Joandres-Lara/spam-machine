import { Request, Response } from "express";
import { Contact } from "@models";

export async function create(request: Request, response: Response) {
 await request.can(
  async () => true,
  async () => {
   try {
    const { name, phone, avatar } = request.body;
    const contactCreate = await Contact.create({
     name,
     phone,
     avatar,
     user_id: request.user?.id,
    });

    response.json(contactCreate);
   } catch (e) {
    console.error(e);
    response.status(500).json({ error: e });
   }
  }
 );
}
