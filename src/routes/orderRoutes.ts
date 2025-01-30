import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entities/orders'
import { orderCreateValidator, orderUpdateValidator } from '../validators/orderValidator'
import { Product } from '../entities/products'
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
    const { error, value } = orderCreateValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const orderRepo = AppDataSource.getRepository(Order)
    const itemRepo = AppDataSource.getRepository(Product)

    // fetch all items by their IDs using the In operator
    const items = await itemRepo.find({ where: { id: In(value.items) } })

    if (items.length !== value.items.length) {
      return res.status(400).json({ message: 'Some items were not found' })
    }

    // create order with validated data and items
    const newOrder = orderRepo.create({ ...value, items })
    const savedOrder = await orderRepo.save(newOrder)

    return res.status(201).json(savedOrder)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating order' })
  }
})

orderRoutes.put('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { error, value } = orderUpdateValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const orderRepo = AppDataSource.getRepository(Order)
    const itemRepo = AppDataSource.getRepository(Product)

    // find the order by id
    const order = await orderRepo.findOne({ where: { id }, relations: ['items'] })
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    Object.assign(order, value) // updated fields

    // If `items` are provided in the request, update them separately because of many to many relationship
    if (value.items) {
      const newItems = await itemRepo.find({
        where: value.items.map((itemId: string) => ({ id: itemId })), // define type as `string`
      })

      if (newItems.length !== value.items.length) {
        return res.status(400).json({ message: 'Some items were not found' })
      }
    }

    await orderRepo.save(order)

    return res.status(200).json(order)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error updating order' })
  }
})

orderRoutes.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params
    const orderRepo = AppDataSource.getRepository(Order)
    const order = await orderRepo.findOneBy({ id })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    await orderRepo.remove(order)
    return res.status(204).json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order:', error)
    return res.status(500).json({ message: 'Error deleting order', error })
  }
})

export default orderRoutes
