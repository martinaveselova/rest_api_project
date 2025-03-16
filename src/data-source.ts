import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { Order } from './entities/orders'
import { Product } from './entities/products'
import { OrderItem } from './entities/orderItem'
import { ProductStock } from './entities/productStock'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Product, Order, OrderItem, ProductStock],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  synchronize: true,
  logging: false,
})

console.log('Connecting to DB:', process.env.DB_USER, process.env.DB_NAME)

console.log('Database connected!')
