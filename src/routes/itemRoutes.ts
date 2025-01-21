import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Item } from '../entities/items'
import { itemValidator } from '../validators/itemValidator'

const itemRoutes = Router()

itemRoutes.get('/items', async (req, res) => {
  try {
    const itemRepo = AppDataSource.getRepository(Item)
    const items = await itemRepo.find()
    return res.json(items)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching items', error })
  }
})

itemRoutes.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const itemRepo = AppDataSource.getRepository(Item)

    const item = await itemRepo.findOneBy({ id })

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    return res.json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    return res.status(500).json({ message: 'Error fetching item', error })
  }
})

itemRoutes.post('/items', async (req, res) => {
  try {
    const { error, value } = itemValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const itemRepo = AppDataSource.getRepository(Item)
    const newItem = itemRepo.create(value)
    const savedItem = await itemRepo.save(newItem)

    return res.status(201).json(savedItem)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating item' })
  }
})

itemRoutes.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { error, value } = itemValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const itemRepo = AppDataSource.getRepository(Item)
    const item = await itemRepo.findOneBy({ id })

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // check for duplicate EAN or SKU
    const existingItem = await itemRepo.findOne({
      where: [{ ean: value.ean }, { sku: value.sku }],
    })

    if (existingItem && existingItem.id !== id) {
      return res.status(409).json({ message: 'EAN or SKU already exists in the database.' })
    }

    Object.assign(item, value)

    await itemRepo.save(item)

    return res.status(200).json(item)
  } catch (error) {
    console.error('Error updating item:', error)
    return res.status(500).json({ message: 'Error updating item', error })
  }
})

itemRoutes.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params
    const itemRepo = AppDataSource.getRepository(Item)
    const item = await itemRepo.findOneBy({ id })

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }
    await itemRepo.remove(item)

    return res.status(204).json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    return res.status(500).json({ message: 'Error deleting item', error })
  }
})

export default itemRoutes
