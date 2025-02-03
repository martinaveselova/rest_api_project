// error handling, request, response logic

import { Request, Response } from 'express'
import { OrderService } from '../services/OrderService'

const orderService = new OrderService()

export class OrderController {
  // Get all orders
  static async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders()
      return res.json(orders)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders', error })
    }
  }

  // Get specific order
  static async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const order = await orderService.getOrderById(id)

      if (!order) return res.status(404).json({ message: 'Order not found' })
      return res.json(order)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching order', error })
    }
  }

  // Create an order

  // Update existing order

  // Delete order
}
