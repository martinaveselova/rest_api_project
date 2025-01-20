import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { Item } from './entities/items'
import { Order } from './entities/orders'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: 'postgres',
  entities: [Item, Order],
  synchronize: true,
  logging: false,
})

console.log('Database connected!')
