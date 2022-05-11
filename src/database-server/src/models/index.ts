import {
 User,
 initUser,
 initializeModel,
} from "@bot-messages/util-shared-node";
import { Contact, initContact } from "./contact-model";
import { SendingMessage, initSendingMessage } from "./sending-message-model";
import { Message, initMessage } from "./message-model";
import { Tag, initTag } from "./tag-model";
import * as configs from "@config";
import { DataTypes, Model } from "sequelize";
import { Options } from "sequelize/types";

class ThroughTagMessage extends Model {}

class LastSendingMessage extends SendingMessage {}

class CronMessage extends Model {}

const { config } = configs as {
 config: Options;
};

initializeModel(initUser, config);
initializeModel(initSendingMessage, config);
initializeModel(initContact, config);
initializeModel(initMessage, config);
initializeModel(initTag, config);

initializeModel(
 (sequelize) =>
  ThroughTagMessage.init(
   {
    message_id: {
     type: DataTypes.INTEGER,
     references: {
      model: Message,
      key: "id",
     },
    },
    tag_id: {
     type: DataTypes.INTEGER,
     references: {
      model: Tag,
      key: "id",
     },
    },
   },
   {
    modelName: "tags_messages",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
   }
  ),
 config
);

initializeModel(
 (sequelize) =>
  CronMessage.init(
   {
    cron_job: {
     allowNull: false,
     type: DataTypes.JSONB,
    },
   },
   {
    sequelize,
    modelName: "cron_jobs_messages",
    createdAt: "created_at",
    updatedAt: "updated_at",
   }
  ),
 config
);

Contact.hasOne(LastSendingMessage, {
 foreignKey: "contact_id",
 as: "last_sending_message",
});

LastSendingMessage.belongsTo(Contact, {
 foreignKey: "contact_id",
});

Contact.hasMany(SendingMessage, {
 foreignKey: "contact_id",
 as: "messages",
});

SendingMessage.belongsTo(Contact, {
 foreignKey: "contact_id",
});

Tag.belongsToMany(Message, {
 through: ThroughTagMessage,
 foreignKey: "tag_id",
});

Message.belongsToMany(Tag, {
 through: ThroughTagMessage,
 foreignKey: "message_id",
});

Contact.belongsToMany(Message, {
 through: CronMessage,
 foreignKey: "contact_id",
});

Message.belongsToMany(Contact, {
 through: CronMessage,
 foreignKey: "message_id",
});

export {
 User,
 Contact,
 SendingMessage,
 Message,
 Tag,
 ThroughTagMessage,
 LastSendingMessage,
 CronMessage
};
