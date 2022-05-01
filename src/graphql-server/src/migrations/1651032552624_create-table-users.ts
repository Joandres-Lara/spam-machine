import { QueryInterface, DataTypes } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.createTable("users", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true
   },
   username: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
   },
   password: {
    allowNull: false,
    type: DataTypes.STRING
   },
   avatar: {
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
  await query.dropTable("users");
 },
};
