import { QueryInterface, DataTypes } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.createTable("tags", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   label: {
    allowNull: false,
    type: DataTypes.STRING
   },
   color: {
    allowNull: false,
    type: DataTypes.STRING
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
  await query.dropTable("tags");
 },
};
