// Defines the routes and hooks them up with the controller methods.

import { Router } from 'express'
import { ProductController } from '../controllers/productController'
import { ProductService } from '../services/ProductService'
import { validateProduct } from '../middlewares/productValidator'

const productRoutes = Router()

const productService = new ProductService()
const productController = new ProductController(productService)

productRoutes.get('/products', productController.getAllProducts.bind(productController))
productRoutes.get('/products/:id', productController.getProductById.bind(productController))
productRoutes.post('/products', validateProduct, productController.createProduct.bind(productController))
productRoutes.put('/products/:id', productController.updateProduct.bind(productController))
productRoutes.delete('/products/:id', productController.deleteProduct.bind(productController))

export default productRoutes
