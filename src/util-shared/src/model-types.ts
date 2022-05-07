export declare interface UserModel {
 id: number;
 token: string;
 username: string;
 password: string;
 avatar: string;
 created_at: Date;
 updated_at: Date;
}

export declare type UserCreationModel = Pick<
 UserModel,
 "token" | "avatar" | "username" | "password"
>;

export declare interface UserModelClass {
 validatePassword(password: string): Promise<boolean>;
}

export declare interface ContactModel {
 id: number;
 name: string;
 phone: string;
 avatar: string;
 created_at: Date;
 updated_at: Date;
}

export declare type ContactCreationModel = Pick<
 ContactModel,
 "avatar" | "name" | "phone"
>;

export declare interface MessageModel {
 id: number;
 content: {
  text: string;
  format: "normal";
 };
 type: string;
 is_default: boolean;
 created_at: Date;
 updated_at: Date;
}

export declare type MessageCreationModel = Pick<MessageModel, "content">;

export declare interface SendingMessage {
 id: number;
 content: string;
 sent_on: Date;
 response_status: string;
 response_content: string;
}

export declare interface TagModel {
 id: number;
 color: string;
 label: string;
 created_at: Date;
 updated_at: Date;
}
