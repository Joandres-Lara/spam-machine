import {
 User,
 initUser,
 initializeModel,
} from "@bot-messages/util-shared-node";
import { Contact, initContact } from "./contact";
import { SendingMessage, initSendingMessage } from "./sending-message";
import { Message, initMessage } from "./message";
import * as configs from "@config";
import { Options } from "sequelize/types";

const { config } = configs as {
 config: Options;
};

initializeModel(initUser, config);
initializeModel(initSendingMessage, config);
initializeModel(initContact, config);
initializeModel(initMessage, config);

Contact.hasOne(SendingMessage, {
 foreignKey: "contact_id",
});

SendingMessage.belongsTo(Contact, {
 foreignKey: "contact_id",
});

export { User, Contact, SendingMessage, Message };
