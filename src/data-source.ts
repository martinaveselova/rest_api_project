import { DataSource } from 'typeorm'
import 'reflect-metadata'
import dotenv from 'dotenv'
import { Order } from './entities/orders'
import { Carrier } from './entities/carriers'
import { CarrierService } from './entities/carrierService'
import { Product } from './entities/products'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
  database: 'postgres',
  entities: [Product, Order, Carrier, CarrierService],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  synchronize: true,
  logging: true,
})

console.log('Database connected!')
