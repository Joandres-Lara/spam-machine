import { QueryInterface, DataTypes } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.createTable("messages", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   content: {
    allowNull: false,
    type: DataTypes.JSONB
   },
   type: {
    allowNull: false,
    type: DataTypes.STRING
   },
   is_default: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
 },
 async down(query: QueryInterface) {
  await query.dropTable("messages");
 },
};
