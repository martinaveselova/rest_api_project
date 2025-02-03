// database queries

import { AppDataSource } from '../data-source'
import { Order } from '../entities/orders'
import { OrderItem } from '../entities/orderItem'
import { Product } from '../entities/products'
import { Repository } from 'typeorm'

export class OrderService {
  orderRepo: Repository<Order>
  orderItemRepo: Repository<OrderItem>
  productRepo: Repository<Product>

  constructor() {
    this.orderRepo = AppDataSource.getRepository(Order)
    this.orderItemRepo = AppDataSource.getRepository(OrderItem)
    this.productRepo = AppDataSource.getRepository(Product)
  }

  async getAllOrders() {
    return await this.orderRepo.find({ relations: ['items', 'items.product'] })
  }

  async getOrderById(id: string) {
    return await this.orderRepo.findOne({ where: { id }, relations: ['items', 'items.product'] })
  }
}
