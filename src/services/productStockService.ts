import { AppDataSource } from '../data-source'
import { ProductStock } from '../entities/productStock'
import { Product } from '../entities/products'
import { Repository } from 'typeorm'

// Handles database logic and interactions with the repository.
export class ProductStockService {
  productStockRepo: Repository<ProductStock>
  productRepo: Repository<Product>

  constructor() {
    this.productStockRepo = AppDataSource.getRepository(ProductStock)
    this.productRepo = AppDataSource.getRepository(Product)
  }

  async getAllProductStocks() {
    return await this.productStockRepo.find()
  }

  async getProductStockById(id: string) {
    return await this.productStockRepo.findOne({
      where: {
        id: id,
      },
    })
  }

  async createProductStock(productId: string, quantity: number): Promise<ProductStock | null> {
    const product = await this.productRepo.findOne({ where: { id: productId } })
    if (!product) {
      throw new Error('Product not found')
    }

    // Check if stock already exists for this product
    const existingStock = await this.productStockRepo.findOne({ where: { product: { id: productId } } })
    if (existingStock) {
      throw new Error('Stock already exists for this product')
    }

    // Create and save new stock entry
    const stock = this.productStockRepo.create({
      product,
      quantity,
    })
    return await this.productStockRepo.save(stock)
  }

  async updateProductStock(id: string, data: { quantity?: number }) {
    await this.productStockRepo.update(id, data)
    return await this.getProductStockById(id)
  }

  async deleteProductStock(id: string) {
    const product = await this.getProductStockById(id)
    if (!product) return null
    await this.productStockRepo.delete(id)
    return product
  }

  async deductStock(productId: string, quantity: number): Promise<void> {
    const productStock = await this.productStockRepo.findOne({ where: { product: { id: productId } } })
    if (!productStock) {
      throw new Error('Product stock not found')
    }

    if (productStock.quantity < quantity) {
      throw new Error('Insufficient stock')
    }

    productStock.quantity -= quantity
    await this.productStockRepo.save(productStock)
  }
}
