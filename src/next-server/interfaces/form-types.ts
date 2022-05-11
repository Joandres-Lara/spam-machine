import { CronMessageCreateRequest } from "@bot-messages/util-shared";

export interface FormFieldsAddMessage extends CronMessageCreateRequest {
 content_message: string;
}
