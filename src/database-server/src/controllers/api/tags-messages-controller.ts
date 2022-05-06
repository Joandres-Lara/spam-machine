import { Message, Tag } from "@models";
import { Request, Response } from "express";
import { Op } from "sequelize";

export async function get(request: Request, response: Response) {
 request.can(
  async () => true,
  async () => {
   try {
    const tags = await Tag.findAll({
     include: Message,
     where: {
      "$messages.is_default$": true
     }
    });

    response.json(tags);
   } catch (e) {
    const error = process.env.NODE_ENV !== "production" ? e : "ServerError";
    console.error(error);
    response.status(500).json({ error });
   }
  }
 );
}
