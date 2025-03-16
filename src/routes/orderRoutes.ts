import { Router } from 'express'
import { OrderController } from '../controllers/orderController'
import { validator } from '../validators/middleware-validator'
import { orderCreateValidator, orderUpdateValidator } from '../validators/orderValidator'
import { OrderService } from '../services/orderService'

const orderRoutes = Router()
const orderService = new OrderService()
const orderController = new OrderController(orderService)

orderRoutes.get('/orders', orderController.getAllOrders)
orderRoutes.get('/orders/:id', orderController.getOrderById)
orderRoutes.post('/orders', validator(orderCreateValidator), orderController.createOrder)
orderRoutes.put('/orders/:id', validator(orderUpdateValidator), orderController.updateOrder)
orderRoutes.delete('/orders/:id', orderController.deleteOrder)

export default orderRoutes
