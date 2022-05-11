import { Request, Response } from "express";
import { CronMessage, Contact } from "@models";
import {
 Periocities,
 CronMessageCreateRequest,
} from "@bot-messages/util-shared";

export function create(request: Request, response: Response) {
 request.can(
  async ({ id }) => {
   const { contact_id } = await request.fields<{ contact_id: number }>();
   const contact = await Contact.findOne({
    where: {
     id: contact_id,
     user_id: id,
    },
   });

   if (contact !== null) {
    request.saveValue("contact", contact);
    return true;
   }

   return false;
  },
  async () => {
   const { periocity, hours, content_message_id, month, weekly_day } =
    await request.fields<CronMessageCreateRequest>();
   // Late and inmediatly not save instance of CronJobMessage instance
   if (periocity === "inmediatly") {
    cronQueue(content_message_id);
   } else if (periocity === "late") {
    cronQueue(content_message_id, hours);
   } else {
    cronQueue(content_message_id, await CronMessage.create({}));s
   }
  }
 );
}
