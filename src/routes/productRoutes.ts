import { Router } from 'express'
import { AppDataSource } from '../data-source'
import { Product } from '../entities/products'
import { productValidator } from '../validators/productValidator'

const productRoutes = Router()

productRoutes.get('/products', async (req, res) => {
  try {
    const productRepo = AppDataSource.getRepository(Product)
    const products = await productRepo.find()
    return res.json(products)
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching products', error })
  }
})

productRoutes.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const productRepo = AppDataSource.getRepository(Product)

    const product = await productRepo.findOneBy({ id })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return res.status(500).json({ message: 'Error fetching product', error })
  }
})

productRoutes.post('/products', async (req, res) => {
  try {
    const { error, value } = productValidator.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((err) => err.message),
      })
    }

    const productRepo = AppDataSource.getRepository(Product)
    const newProduct = productRepo.create(value)
    const savedProduct = await productRepo.save(newProduct)

    return res.status(201).json(savedProduct)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error creating product' })
  }
})

productRoutes.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const { error, value } = productValidator.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.details.map((err) => err.message),
      })
    }

    const productRepo = AppDataSource.getRepository(Product)
    const product = await productRepo.findOneBy({ id })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    // check for duplicate EAN or SKU
    const existingProduct = await productRepo.findOne({
      where: [{ ean: value.ean }, { sku: value.sku }],
    })

    if (existingProduct && existingProduct.id !== id) {
      return res.status(409).json({ message: 'EAN or SKU already exists in the database.' })
    }

    Object.assign(product, value)

    await productRepo.save(product)

    return res.status(200).json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return res.status(500).json({ message: 'Error updating product', error })
  }
})

productRoutes.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params
    const productRepo = AppDataSource.getRepository(Product)
    const product = await productRepo.findOneBy({ id })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    await productRepo.remove(product)

    return res.status(204).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return res.status(500).json({ message: 'Error deleting product', error })
  }
})

export default productRoutes
