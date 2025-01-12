import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
import { Item } from "./entities/item";

dotenv.config(); // Load env variables from .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: "postgres",
  password: "Lokisek12!",
  database: "postgres",
  entities: [Item],
  synchronize: true,
  logging: false,
});

console.log("Using DB:", AppDataSource.options.database);
