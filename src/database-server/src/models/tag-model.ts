import { Model, DataTypes, CreationOptional } from "sequelize";
import type {
 Sequelize,
 BelongsToManyAddAssociationsMixin,
 BelongsToManyAddAssociationMixin,
} from "sequelize";
import { Message } from "./message-model";
import { ThroughTagMessage } from "./through-tag-message-model";

export class Tag extends Model {
 declare id: CreationOptional<number>;
 declare label: string;
 declare color: string;

 declare addMessages: BelongsToManyAddAssociationsMixin<Message, number>;
 declare addMessage: BelongsToManyAddAssociationMixin<Message, number>;

 static associate(){
  Tag.belongsToMany(Message, {
   through: ThroughTagMessage,
   foreignKey: "tag_id",
  });
 }
}

export function initTag(sequelize: Sequelize) {
 Tag.init(
  {
   label: {
    allowNull: false,
    type: DataTypes.STRING,
   },
   color: {
    allowNull: false,
    type: DataTypes.STRING,
   },
  },
  {
   sequelize,
   modelName: "tags",
   createdAt: "created_at",
   updatedAt: "updated_at",
  }
 );

 return Tag;
}

export default initTag;
