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
 content: string;
 type: string;
 created_at: Date;
 updated_at: Date;
}

export declare interface SendingMessage {
 content: string;
 sent_on: Date;
 response_status: string;
 response_content: string;
}
