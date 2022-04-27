import { DataTypes, QueryInterface } from "sequelize";

export default {
 up(query: QueryInterface): Promise<void> {
  return query.sequelize.transaction(async (transaction) => {
   await query.createTable("sending_messages", {
    id: {
     allowNull: false,
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
    },
    contact_id: {
     allowNull: false,
     type: DataTypes.INTEGER,
     references: {
      model: "contacts",
      key: "id"
     },
     onDelete: "SET NULL",
     onUpdate: "SET NULL"
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
  return query.sequelize.transaction(async (transaction) => {
   query.dropTable("sending_messages");
  });
 },
};
