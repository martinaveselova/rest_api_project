// Defines the routes and hooks them up with the controller methods.

import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'
import { OrderService } from '../services/OrderService'

const orderRoutes = Router()

const orderService = new OrderService()
const orderController = new OrderController(orderService)

orderRoutes.get('/orders', orderController.getAllOrders.bind(orderController))
orderRoutes.get('/orders/:id', orderController.getOrderById.bind(orderController))
orderRoutes.delete('/orders/:id', orderController.deleteOrder.bind(orderController))

export default orderRoutes
