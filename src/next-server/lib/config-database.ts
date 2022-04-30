import { Options } from "sequelize";

const config = {
 dialect: "postgres",
 username: process.env.DATABASE_USERNAME,
 password: process.env.DATABASE_PASSWORD,
 host: process.env.DATABASE_HOST,
 port: Number.parseInt(process.env.DATABASE_PORT),
 database: process.env.DATABASE_NAME,
} as Options;

export { config };
