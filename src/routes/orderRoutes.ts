import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entities/orders'
import { orderValidator } from '../validators/orderValidator'
import { Item } from '../entities/items'
import { In } from 'typeorm'

const orderRoutes = Router()

orderRoutes.get('/orders', async (req, res) => {
  try {
    const orderRepo = AppDataSource.getRepository(Order)
    const orders = await orderRepo.find()
    return res.json(orders)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching orders', error })
  }
})

orderRoutes.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const orderRepo = AppDataSource.getRepository(Order)

    // Fetch order including its items
    const order = await orderRepo.findOne({ where: { id }, relations: ['items'] })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    return res.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return res.status(500).json({ message: 'Error fetching order', error })
  }
})

orderRoutes.post('/orders', async (req, res) => {
  try {
    const { error, value } = orderValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const orderRepo = AppDataSource.getRepository(Order)
    const itemRepo = AppDataSource.getRepository(Item)

    // Fetch all items by their IDs using the In operator
    const items = await itemRepo.find({ where: { id: In(value.items) } })

    if (items.length !== value.items.length) {
      return res.status(400).json({ message: 'Some items were not found' })
    }

    // Create order with validated data and items
    const newOrder = orderRepo.create({ ...value, items })
    const savedOrder = await orderRepo.save(newOrder)

    return res.status(201).json(savedOrder)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating order' })
  }
})

export default orderRoutes
