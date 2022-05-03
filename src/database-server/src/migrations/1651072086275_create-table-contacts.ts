import { QueryInterface, DataTypes } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.createTable("contacts", {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
   },
   user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
     model: "users",
     key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
   },
   name: {
    allowNull: false,
    type: DataTypes.STRING,
   },
   phone: {
    allowNull: false,
    type: DataTypes.STRING,
   },
   avatar: {
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
 },
 async down(query: QueryInterface) {
  await query.dropTable("contacts");
 },
};
