import { Request, Response } from "express";
import { CronMessage, Contact, Message } from "@models";
import {
 CronMessageCreateRequest,
 Months,
 Periocities,
 WeeklyDays,
} from "@bot-messages/util-shared";
import cronQueue from "@lib/cron-queue";
import YupValidator from "@lib/validators/yup-validator";
import { array, number, object, string } from "yup";

function enumKeys(e: any) {
 return Object.keys(e).filter((v) => Number.isNaN(Number.parseInt(v)));
}

const schemaCronCreate = object()
 .shape({
  content_message_id: number().required(),
  contact_id: number().required(),
  hours: array().of(string()).default([]),
  month: string().is(enumKeys(Months)).nullable(),
  weekly_day: string().is(enumKeys(WeeklyDays)).nullable(),
  periocity: string().is(enumKeys(Periocities)).required(),
  tz: string().required(),
 })
 .required();

const validatorCronCreate = new YupValidator(schemaCronCreate);

export function create(request: Request, response: Response) {
 request.can(
  async () => {
   await request.validateAndThrow(
    await request.fields<CronMessageCreateRequest>(),
    validatorCronCreate
   );

   return true;
  },
  async () => {
   try {
    const {
     periocity,
     content_message_id,
     contact_id,
     hours = [],
     month = null,
     weekly_day = null,
     tz,
    } = await request.fields<CronMessageCreateRequest>();

    const cronMessageCreated = await CronMessage.create(
     {
      message_id: content_message_id,
      contact_id: contact_id,
      cron_job: {
       hours,
       month,
       weekly_day,
       periocity,
       tz,
      },
     },
     {
      include: [Message, Contact],
     }
    );

    await cronQueue(cronMessageCreated);

    response.json(cronMessageCreated);
   } catch (e) {
    console.error(e);
    response.status(500).json({ error: e });
   }
  }
 );
}
