import { DataTypes, QueryInterface } from "sequelize";

export default {
 up(query: QueryInterface): Promise<void> {
  return query.sequelize.transaction(async () => {
   await query.createTable("tags_messages", {
    id: {
     allowNull: false,
     autoIncrement: true,
     primaryKey: true,
     type: DataTypes.INTEGER,
    },
    message_id: {
     allowNull: false,
     type: DataTypes.INTEGER,
     references: {
      model: "messages",
      key: "id",
     },
     onDelete: "CASCADE",
     onUpdate: "CASCADE",
    },
    tag_id: {
     allowNull: false,
     type: DataTypes.INTEGER,
     references: {
      model: "tags",
      key: "id",
     },
     onDelete: "CASCADE",
     onUpdate: "CASCADE",
    },
    created_at: {
     allowNull: false,
     type: DataTypes.DATE,
    },
    updated_at: {
     allowNull: false,
     type: DataTypes.DATE,
    },
   });
  });
 },
 down(query: QueryInterface) {
  return query.sequelize.transaction(async () => {
   await query.dropTable("tags_messages");
  });
 },
};
