import { Request, Response } from "express";
import { Message, SendingMessage, ThroughTagMessage } from "@models";
import { array, number, object } from "yup";
import YupValidator from "@lib/validators/yup-validator";
import { ToggleTagsMessageRequest } from "@bot-messages/util-shared";

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

const schemaById = object()
 .shape({
  toggle: array().of(number()).required(),
 })
 .required();

const yupValidatorSchemaById = new YupValidator(schemaById);

export function byId(request: Request, response: Response) {
 request.can(
  async () => {
   await request.validateAndThrow(
    await request.fields<ToggleTagsMessageRequest>(),
    yupValidatorSchemaById
   );
   return true;
  },
  async () => {
   const { id: message_id } = request.params;
   const { toggle: toggleTags } =
    await request.fields<ToggleTagsMessageRequest>();
   await ThroughTagMessage.toggleTags(Number.parseInt(message_id), toggleTags);

   response.json(await Message.findByPk(message_id, { include: "tags" }));
  }
 );
}

export function get(request: Request, response: Response) {
 request.can(
  async () => true,
  async () => {
   response.json(await Message.findAll());
  }
 );
}
