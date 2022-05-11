import { Periocities, Months, WeeklyDays } from "./util-types";
import { ContactCreationModel, TagModel } from "./model-types";

export type InteractWithDatabaseServer<T = Record<string, unknown>> = T & {
 [key: string]: unknown;
 token: string;
};

export interface CronMessageCreateRequest {
 content_message_id: number;
 periocity: keyof typeof Periocities;
 hours: string[];
 month: keyof typeof Months;
 weekly_day: keyof typeof WeeklyDays;
}

export type ContactCreateRequest = Pick<
 ContactCreationModel,
 "avatar" | "name" | "phone"
>;

export type TagCreateRequest = Pick<TagModel, "color" | "label"> & {
 attach_to?: number | number[];
};