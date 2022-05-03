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
    content: {
     allowNull: true,
     type: DataTypes.STRING
    },
    sent_on: {
     allowNull: false,
     type: DataTypes.DATE
    },
    response_status: {
     allowNull: false,
     type: DataTypes.STRING
    },
    response_content: {
     allowNull: false,
     // NOTE: This length maybe can be longer
     type: DataTypes.STRING(5000)
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
    }
   });
  });
 },
 down(query: QueryInterface) {
  return query.sequelize.transaction(async (transaction) => {
   query.dropTable("sending_messages");
  });
 },
};
