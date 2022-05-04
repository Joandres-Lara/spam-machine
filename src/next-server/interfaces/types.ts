import { ContactModel, UserModel, MessageModel } from "@bot-messages/util-shared";

export type UserSession = Pick<UserModel, "token" | "username">;

export type InteractWithDatabaseServer<T> = T & {
 token: string;
};

export type HistoryMessage = ContactModel & {
 lastSendingMessage: MessageModel
}

export interface SelectedHistoryContact extends Pick<ContactModel, "name" | "avatar" | "id">{
 messages_count: number;
}
