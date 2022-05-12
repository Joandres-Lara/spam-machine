import { Request, Response } from "express";
import { Message } from "@models";

export function create(request: Request, response: Response) {
 request.can(
  async () => {
   // Check own user contact
   return true;
  },
  async () => {
   try {
    const { content } = await request.fields();
    response.json(
     await Message.create({ content, type: "sms", is_default: false })
    );
   } catch (e) {
    console.error(e);
    response.status(500).json({ error: e });
   }
  }
 );
}

export function byId(request: Request, response: Response) {
 request.can(
  async () => {
   return true;
  },
  async () => {
   const fields = await request.fields();
   console.log({ fields });
  }
 );
}
