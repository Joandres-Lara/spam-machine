import { initializeModel } from "@bot-messages/util-shared-node";
import { Contact, initContact } from "./contact-model";
import { SendingMessage, initSendingMessage } from "./sending-message-model";
import { CronMessage, initCronMessage } from "./cron-message-model";
import { User, initUser } from "./user-model";
import { Message, initMessage } from "./message-model";
import { Tag, initTag } from "./tag-model";
import * as configs from "@config";
import { Options } from "sequelize/types";
import {
 ThroughTagMessage,
 initThroughTagMessage,
} from "./through-tag-message-model";

const { config } = configs as {
 config: Options;
};

initializeModel(initUser, config);
initializeModel(initContact, config);
initializeModel(initMessage, config);
initializeModel(initTag, config);
initializeModel(initCronMessage, config);
initializeModel(initThroughTagMessage, config);
initializeModel(initSendingMessage, config);

CronMessage.associate();
Message.associate();
Contact.associate();
SendingMessage.associate();
Tag.associate();
User.associate();

export {
 User,
 Contact,
 SendingMessage,
 Message,
 Tag,
 ThroughTagMessage,
 CronMessage,
};
