import { Request, Response } from "express";
import { Contact } from "@models";

export async function get(request: Request, response: Response) {
 response.json(await Contact.findAll());
}

export async function create(request: Request, response: Response) {
 await request.can(
  async () => true,
  async () => {
   try {
    const authorizedUser = request.user;

    const { name, phone, avatar } = request.body;
    const contactCreate = await Contact.create({
     name,
     phone,
     avatar,
     user_id: authorizedUser?.id,
    });

    response.json(contactCreate);
   } catch (e) {
    console.error(e);
    response.status(500).json({ error: e });
   }
  }
 );
}
