import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { Order } from './entities/orders'
import { Product } from './entities/products'
import { OrderItem } from './entities/orderItem'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: 'postgres',
  entities: [Product, Order, OrderItem],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  synchronize: true,
  logging: false,
})

console.log('Database connected!')
