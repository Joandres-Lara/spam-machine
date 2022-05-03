import { Request, Response } from "express";
import { Contact } from "@models";

export async function get(request : Request, response: Response){
 response.json(await Contact.findAll());
}

export async function create(request: Request, response: Response){
 request.can(async () => true);

 const authorizedUser = request.user;

 const {name, phone, avatar, token } = request.body;
 const contactCreate = await Contact.create({
  name,
  phone,
  avatar,
  user_id: authorizedUser?.id
 });

 response.json(contactCreate)
}
