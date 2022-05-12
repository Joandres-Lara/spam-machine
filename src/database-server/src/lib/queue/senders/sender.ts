export interface SenderResult {
 status: string;
 response: string;
}

export interface Sender {
 send(content: string, to?: string): Promise<SenderResult>;
}
