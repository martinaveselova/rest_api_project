import { AppDataSource } from '../data-source'
import { Product } from '../entities/products'
import { Repository } from 'typeorm'

// Handles database logic and interactions with the repository.
export class ProductService {
  productRepo: Repository<Product>

  constructor() {
    this.productRepo = AppDataSource.getRepository(Product)
  }

  async getAllProducts() {
    return await this.productRepo.find()
  }

  async getProductById(id: string) {
    return await this.productRepo.findOne({
      where: {
        id: id,
      },
    })
  }

  async createProduct(data: { name: string; ean: string; sku: string }) {
    const newProduct = this.productRepo.create(data)
    return await this.productRepo.save(newProduct)
  }

  async updateProduct(id: string, data: { name?: string; ean?: string; sku?: string }) {
    await this.productRepo.update(id, data)
    return await this.getProductById(id)
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id)
    if (!product) return null
    await this.productRepo.delete(id)
    return product
  }
}
