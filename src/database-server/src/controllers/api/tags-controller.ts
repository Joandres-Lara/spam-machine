import { Request, Response } from "express";
import { TagCreateRequest, TagFindRequest } from "@bot-messages/util-shared";
import { Tag, Message } from "@models";
import YupValidator from "@lib/validators/yup-validator";
import JsonError from "@lib/json-error";
import { array, object, string, number, mixed } from "yup";
import { Op } from "sequelize";

const schemaCreateTag = object().shape({
 label: string().required(),
 color: string().required(),
 attach_to: mixed().when({
  is: Array.isArray,
  then: array().of(number()),
  otherwise: number(),
 }),
});

const validatorCreateTag = new YupValidator(schemaCreateTag);

export function create(request: Request, response: Response) {
 request.can(
  async () => {
   await request.validate(
    await request.fields<TagCreateRequest>(),
    validatorCreateTag
   );

   if (validatorCreateTag.hasError()) {
    throw new JsonError(validatorCreateTag.getError());
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
   response.json(createdTag);
  }
 );
}

const schemaFindTag = object().shape({
 by: string().required().is(["label"]),
 value: mixed()
  .required()
  .when("by", {
   is: (by: string) => by === "label",
   then: string().required(),
  }),
});

const validatorFindTag = new YupValidator(schemaFindTag);

function findByLabel(value: string) {
 return Tag.findAll({
  where: {
   label: {
    // TODO: Chek is posible SQLInjection
    [Op.iLike]: `%${value}%`,
   },
  },
 });
}

const finders = {
 label: findByLabel,
};

export function find(request: Request, response: Response) {
 request.can(
  async () => {
   await request.validateAndThrow(
    await request.fields<TagFindRequest>(),
    validatorFindTag
   );

   return true;
  },
  async () => {
   const { by, value } = await request.fields<TagFindRequest>();
   response.json(await finders[by](value));
  }
 );
}
