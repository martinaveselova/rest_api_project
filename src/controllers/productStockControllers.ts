import { Request, Response } from 'express'
import { ProductStockService } from '../services/productStockService'

// Handles request-response logic and validates data.
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  // Get all product stocks
  getAllProductStocks = async (req: Request, res: Response) => {
    try {
      const products = await this.productStockService.getAllProductStocks()
      return res.json(products)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products.', error })
    }
  }

  // Get specific product stock
  getProductStockById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await this.productStockService.getProductStockById(id)

      if (!product) return res.status(404).json({ message: 'Product stock not found' })
      return res.json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching product stock.', error })
    }
  }

  // Create product stock
  createProductStock = async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body

      if (!productId || quantity === undefined) {
        return res.status(400).json({ message: 'Product ID and quantity are required' })
      }

      const stock = await this.productStockService.createProductStock(productId, quantity)
      return res.status(201).json({ message: 'Product stock created successfully', stock })
    } catch (error) {
      return res.status(400).json({ message: 'Error creating product stock.', error })
    }
  }

  // Update specific product stock
  updateProductStock = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updatedProduct = await this.productStockService.updateProductStock(id, req.body)

      if (!updatedProduct) return res.status(404).json({ message: 'Product stock not found' })
      return res.json({ message: 'Product stock updated.', updatedProduct })
    } catch (error) {
      return res.status(500).json({ message: 'Error updating product stock.', error })
    }
  }

  // Delete product stock
  deleteProductStock = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedProduct = await this.productStockService.deleteProductStock(id)

      if (!deletedProduct) return res.status(404).json({ message: 'Product stock not found or cannot be deleted.' })
      return res.json({ message: 'Product stock deleted successfully.', deletedProduct })
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product stock.', error })
    }
  }
}
