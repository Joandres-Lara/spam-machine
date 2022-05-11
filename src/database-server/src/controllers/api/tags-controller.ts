import { Request, Response } from "express";
import { TagCreateRequest } from "@bot-messages/util-shared";
import { Tag, Message, ThroughTagMessage } from "@models";
import YupValidator from "@lib/validators/yup-validator";
import JsonError from "@lib/json-error";
import { array, object, string, number, mixed } from "yup";
import { Op } from "sequelize";

const schema = object().shape({
 label: string().required(),
 color: string().required(),
 attach_to: mixed().when({
  is: Array.isArray,
  then: array().of(number()),
  otherwise: number()
 })
});

const validatorTag = new YupValidator(schema);

export function create(request: Request, response: Response) {
 request.can(
  async () => {
   await request.validate(
    await request.fields<TagCreateRequest>(),
    validatorTag
   );

   if (validatorTag.hasError()) {
    throw new JsonError(validatorTag.getError());
   }

   return true;
  },
  async () => {
   const { label, color, attach_to } = await request.fields<TagCreateRequest>();
   const createdTag = await Tag.create({ label, color });
   if (attach_to && typeof attach_to === "number") {
    const message = await Message.findByPk(attach_to);
    if (message !== null) {
     createdTag.addMessage(message);
    }
   } else if (Array.isArray(attach_to)) {
    const messages = await Message.findAll({
     where: {
      id: {
       [Op.in]: attach_to,
      },
     },
    });
    createdTag.addMessages(messages);
   }

   console.log(createdTag.toJSON());
   response.json(createdTag);
  }
 );
}
