// endpoints

import { Router } from 'express'
import { OrderController } from '../controllers/OrderController'

const orderRoutes = Router()

orderRoutes.get('/orders', OrderController.getAllOrders)
orderRoutes.get('/orders/:id', OrderController.getOrderById)

export default orderRoutes
