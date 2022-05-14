import { Cron } from "@bot-messages/util-shared";
import { SenderInterface, SenderResult } from "@lib/queue/senders/sender";

export type ResultDriver = SenderResult;

export type DriverCallbackFilled = (result: ResultDriver) => void;

export interface DriverInterface {
 initialize(): Promise<void>;
 queue(
  cron: Cron,
  content: string,
  to: string,
  onFilled: DriverCallbackFilled
 ): void;
 getSender(): SenderInterface;
}
