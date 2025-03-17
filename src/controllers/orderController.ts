import { Request, Response } from 'express'
import { OrderService } from '../services/orderService'

// Handles request-response logic and validates data.
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderService.getAllOrders()
      return res.json(orders)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching orders.', error })
    }
  }

  // Get specific order
  getOrderById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const order = await this.orderService.getOrderById(id)

      if (!order) return res.status(404).json({ message: 'Order not found.' })
      return res.json(order)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching order.', error })
    }
  }

  // Create order
  createOrder = async (req: Request, res: Response) => {
    try {
      const order = await this.orderService.createOrder(req.body)
      return res.status(201).json({ message: 'Order created successfully', order })
    } catch (error) {
      console.error('Error creating order:', error)

      return res.status(500).json({
        message: 'Error creating order.',
        error: error instanceof Error ? error.message : error,
      })
    }
  }

  // Update order
  updateOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updatedOrder = await this.orderService.updateOrder(id, req.body)
      if (!updatedOrder) return res.status(404).json({ message: 'Order not found' })
      return res.json(updatedOrder)
    } catch (error) {
      return res.status(500).json({ message: 'Error updating order.', error })
    }
  }

  // Delete order
  deleteOrder = async (req: Request, res: Response) => {
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
