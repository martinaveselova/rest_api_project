import { Router } from 'express'
import { ProductController } from '../controllers/productController'
import { ProductService } from '../services/productService'
import { validator } from '../validators/middleware-validator'
import { productValidator } from '../validators/productValidator'

const productRoutes = Router()

const productService = new ProductService()
const productController = new ProductController(productService)

productRoutes.get('/products', productController.getAllProducts)
productRoutes.get('/products/:id', productController.getProductById)
productRoutes.post('/products', validator(productValidator), productController.createProduct)
productRoutes.put('/products/:id', validator(productValidator), productController.updateProduct)
productRoutes.delete('/products/:id', productController.deleteProduct)

export default productRoutes
