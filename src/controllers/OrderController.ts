// Handles request-response logic and validates data.
import { Request, Response } from 'express'
import { OrderService } from '../services/OrderService'

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getAllOrders()
      return res.json(orders)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders.', error })
    }
  }

  // Get specific order
  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const order = await this.orderService.getOrderById(id)

      if (!order) return res.status(404).json({ message: 'Order not found.' })
      return res.json(order)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching order.', error })
    }
  }

  // Delete order
  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params
      const deletedOrder = await this.orderService.deleteOrder(id)

      if (!deletedOrder) return res.status(404).json({ message: 'Order not found or cannot be deleted.' })
      return res.json({ message: 'Order deleted successfully.', deletedOrder })
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting order.', error })
    }
  }
}
