import { QueryInterface, DataTypes } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.createTable("[model-name]", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  await query.dropTable("[model-name]");
 },
};
