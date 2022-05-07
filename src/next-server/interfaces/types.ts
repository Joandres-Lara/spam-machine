import {
 ContactModel,
 UserModel,
 MessageModel,
 TagModel,
} from "@bot-messages/util-shared";

export type UserSession = Pick<UserModel, "token" | "username">;

export type InteractWithDatabaseServer<T> = T & {
 token: string;
};

export interface ContactModelMessagesCounts extends ContactModel {
 messages_count: number;
}

// Alias
export type SelectedHistoryContact = ContactModelMessagesCounts;

export interface HistoryMessage extends ContactModelMessagesCounts {
 last_sending_message: MessageModel;
}

export interface MessageTags extends MessageModel {
 tags: TagMessages[];
}

export interface TagMessages extends TagModel {
 messages: MessageTags[];
}
export interface TagModelEditable extends TagModel {
 recient_created?: boolean;
}
