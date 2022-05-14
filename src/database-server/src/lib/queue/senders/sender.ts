export interface SenderResult {
 status: string;
 response: string;
}

export interface SenderInterface {
 initialize(): Promise<void>;
 send(content: string, to?: string): Promise<SenderResult>;
}
