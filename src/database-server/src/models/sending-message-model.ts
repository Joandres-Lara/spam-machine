import {
 Model,
 DataTypes,
 CreationOptional,
 NonAttribute,
 HasOneGetAssociationMixin,
 InferCreationAttributes,
 InferAttributes,
} from "sequelize";
import type { Sequelize } from "sequelize";
import { Contact } from "./contact-model";
import { TagModel } from "@bot-messages/util-shared";

export class SendingMessage extends Model<
 InferAttributes<SendingMessage>,
 InferCreationAttributes<SendingMessage>
> {
 declare sent_on: CreationOptional<Date>;
 declare response_status: string;
 declare response_content: string;
 declare contact_id: CreationOptional<number>;
 declare content: {
  text: string;
  tags: Pick<TagModel, "color" | "label">[];
 };

 declare contact?: NonAttribute<Contact>;

 declare getContact: HasOneGetAssociationMixin<Contact>;

 static associate() {
  SendingMessage.belongsTo(Contact, {
   foreignKey: "contact_id",
  });
 }
}

export function initSendingMessage(sequelize: Sequelize) {
 SendingMessage.init(
  {
   contact_id: {
    type: DataTypes.INTEGER,
    references: {
     model: Contact,
     key: "id",
    },
   },
   content: {
    type: DataTypes.JSONB,
    allowNull: false,
   },
   sent_on: DataTypes.DATE,
   response_status: DataTypes.STRING,
   response_content: DataTypes.STRING,
  },
  {
   sequelize,
   modelName: "sending_messages",
   createdAt: "sent_on",
   updatedAt: false,
  }
 );

 return SendingMessage;
}

export default initSendingMessage;
