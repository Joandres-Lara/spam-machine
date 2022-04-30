export declare interface UserModel {
 username: string;
 password: string;
 avatar: string;
 created_at: Date;
 updated_at: Date;
}

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
