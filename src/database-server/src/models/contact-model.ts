import {
 Model,
 DataTypes,
 CreationOptional,
 NonAttribute,
 HasOneGetAssociationMixin,
 InferAttributes,
 InferCreationAttributes,
} from "sequelize";
import { Sequelize } from "sequelize";
import { SendingMessage } from "./sending-message-model";
import { Message } from "./message-model";
import { CronMessage } from "./cron-message-model";
import { User } from "./user-model";

export class Contact extends Model<
 InferAttributes<Contact>,
 InferCreationAttributes<Contact>
> {
 declare id: CreationOptional<number>;
 declare name: string;
 declare phone: string;
 declare avatar: string;
 declare created_at: CreationOptional<Date>;
 declare updated_at: CreationOptional<Date>;

 declare user_id: CreationOptional<number>;
 declare last_sending_message?: NonAttribute<SendingMessage>;
 declare user?: NonAttribute<User>;

 declare getUser: HasOneGetAssociationMixin<User>;

 static associate() {
  Contact.hasOne(SendingMessage, {
   foreignKey: "contact_id",
   as: "last_sending_message",
  });

  Contact.hasMany(SendingMessage, {
   foreignKey: "contact_id",
   as: "messages",
  });

  Contact.belongsToMany(Message, {
   through: CronMessage,
   as: "pivot_message",
   foreignKey: "contact_id",
  });

  Contact.hasMany(CronMessage, {
   as: "cron_contact",
   foreignKey: "contact_id",
  });

  Contact.belongsTo(User, {
   foreignKey: "user_id",
  });
 }
}

export function initContact(sequelize: Sequelize) {
 Contact.init(
  {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
   },
   name: DataTypes.STRING,
   phone: DataTypes.STRING,
   avatar: DataTypes.STRING,
   created_at: DataTypes.DATE,
   updated_at: DataTypes.DATE,
   user_id: {
    type: DataTypes.INTEGER,
    references: {
     model: User,
     key: "id",
    },
   },
  },
  {
   sequelize,
   modelName: "contacts",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return Contact;
}

export default initContact;
