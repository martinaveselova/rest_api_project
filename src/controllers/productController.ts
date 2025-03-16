import { Request, Response } from 'express'
import { ProductService } from '../services/productService'

// Handles request-response logic and validates data.
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts()
      return res.json(products)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products.', error })
    }
  }

  // Get specific product
  getProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const product = await this.productService.getProductById(id)

      if (!product) return res.status(404).json({ message: 'Product not found' })
      return res.json(product)
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching product.', error })
    }
  }

  // Create product
  createProduct = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.createProduct(req.body)
      return res.status(201).json({ message: 'Product created.', product })
    } catch (error) {
      return res.status(500).json({ message: 'Error creating product.', error })
    }
  }

  // Update specific product
  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updatedProduct = await this.productService.updateProduct(id, req.body)

      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' })
      return res.json({ message: 'Product updated.', updatedProduct })
    } catch (error) {
      return res.status(500).json({ message: 'Error updating product.', error })
    }
  }

  // Delete product
  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const deletedProduct = await this.productService.deleteProduct(id)

      if (!deletedProduct) return res.status(404).json({ message: 'Product not found or cannot be deleted.' })
      return res.json({ message: 'Product deleted successfully.', deletedProduct })
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting product.', error })
    }
  }
}
