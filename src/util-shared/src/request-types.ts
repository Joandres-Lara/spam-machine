import { Cron } from "./util-types";
import { ContactCreationModel, TagModel } from "./model-types";

export type InteractWithDatabaseServer<T = Record<string, unknown>> = T & {
 [key: string]: unknown;
 token: string;
};

export interface CronMessageCreateRequest extends Cron {
 content_message_id: number;
 contact_id: number;
}

export type ContactCreateRequest = Pick<
 ContactCreationModel,
 "avatar" | "name" | "phone"
>;

export interface TagsMessagesToggleRequest {
 toggle: number[];
}

export type TagCreateRequest = Pick<TagModel, "color" | "label"> & {
 attach_to?: number | number[];
};

export interface TagFindRequest {
 by: "label";
 value: string;
}

export interface ToggleTagsMessageRequest {
 toggle: number[];
}
