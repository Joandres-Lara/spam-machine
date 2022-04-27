import { DataTypes, QueryInterface } from "sequelize";

export default {
 up(query: QueryInterface): Promise<void> {
  return query.sequelize.transaction(async (transaction) => {
   await query.createTable("cron_jobs_messages", {
    id: {
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
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
    contact_id: {
     allowNull: false,
     type: DataTypes.INTEGER,
     references: {
      model: "contacts",
      key: "id",
     },
     onDelete: "CASCADE",
     onUpdate: "CASCADE",
    },
    cron_job_or_date: {
     allowNull: false,
     type: DataTypes.STRING,
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
   query.dropTable("cron_jobs_messages");
  });
 },
};
