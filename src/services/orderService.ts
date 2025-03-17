import { AppDataSource } from '../data-source'
import { Order } from '../entities/orders'
import { OrderItem } from '../entities/orderItem'
import { Product } from '../entities/products'
import { Repository } from 'typeorm'
import { ProductStockService } from './productStockService'

// Handles database logic and interactions with the repository.
export class OrderService {
  orderRepo: Repository<Order>
  orderItemRepo: Repository<OrderItem>
  productRepo: Repository<Product>
  productStockService: ProductStockService

  constructor() {
    this.orderRepo = AppDataSource.getRepository(Order)
    this.orderItemRepo = AppDataSource.getRepository(OrderItem)
    this.productRepo = AppDataSource.getRepository(Product)
    this.productStockService = new ProductStockService()
  }

  async getAllOrders() {
    return await this.orderRepo.find({ relations: ['items', 'items.product'] })
  }

  async getOrderById(id: string) {
    return await this.orderRepo.findOne({ where: { id }, relations: ['items', 'items.product'] })
  }

  async createOrder(data: {
    carrier: string
    carrierService: string
    firstName: string
    lastName: string
    deliveryStreet: string
    deliveryZipCode: string
    deliveryCity: string
    deliveryPhone: string
    deliveryEmail: string
    items: { productId: string; quantity: number }[]
  }) {
    const order = this.orderRepo.create(data)
    await this.orderRepo.save(order)

    const orderItems = data.items.map(async (item) => {
      await this.productStockService.deductStock(item.productId, item.quantity)
      return this.orderItemRepo.create({ order, product: { id: item.productId }, quantity: item.quantity })
    })
    await this.orderItemRepo.save(await Promise.all(orderItems))

    return await this.getOrderById(order.id)
  }

  async updateOrder(
    id: string,
    data: Partial<{
      carrier: string
      carrierService: string
      firstName: string
      lastName: string
      deliveryStreet: string
      deliveryZipCode: string
      deliveryCity: string
      deliveryPhone: string
      deliveryEmail: string
      items: { productId: string; quantity: number }[]
    }>,
  ) {
    await this.orderRepo.update(id, data)
    return await this.getOrderById(id)
  }

  async deleteOrder(id: string) {
    const order = await this.getOrderById(id)
    if (!order) return null
    await this.orderRepo.delete(id)
    return order
  }
}
