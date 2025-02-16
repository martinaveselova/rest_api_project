// Defines the routes and hooks them up with the controller methods.

import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'
import { validateOrder } from '../validators/orderValidator'
import { OrderService } from '../services/OrderService'

const orderRoutes = Router()

const orderService = new OrderService()
const orderController = new OrderController(orderService)

orderRoutes.get('/orders', orderController.getAllOrders.bind(orderController))
orderRoutes.get('/orders/:id', orderController.getOrderById.bind(orderController))
orderRoutes.post('/orders', validateOrder, orderController.createOrder.bind(orderController))
orderRoutes.put('/orders/:id', orderController.updateOrder.bind(orderController))
orderRoutes.delete('/orders/:id', orderController.deleteOrder.bind(orderController))

export default orderRoutes
