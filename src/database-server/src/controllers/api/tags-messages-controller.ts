import { Message, Tag, Contact } from "@models";
import { Request, Response } from "express";
import YupValidator from "@lib/validators/yup-validator";
import { object, number } from "yup";
import { Op } from "sequelize";

const schema = object().shape({
 contact_id: number().required(),
});

const validator = new YupValidator(schema);

interface RequestGetTags {
 contact_id: number;
}

export async function get(request: Request, response: Response) {
 request.can(
  async () => {
   // TODO: This route is authorizathed by default
   return true;
  },
  async () => {
   try {
    const tagsDefault = await Tag.findAll({
     include: {
      model: Message,
      as: "messages",
      include: [Tag],
      where: {
       is_default: true,
      },
     },
     order: [["id", "ASC"]],
    });
    // TODO: Send last messages templates created by user.
    response.json(tagsDefault);
   } catch (e) {
    const error = process.env.NODE_ENV !== "production" ? e : "ServerError";
    console.error(error);
    response.status(500).json({ error });
   }
  }
 );
}
