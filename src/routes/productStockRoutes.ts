import { Router } from 'express'
import { ProductStockController } from '../controllers/productStockControllers'
import { ProductStockService } from '../services/productStockService'

// Defines the routes and hooks them up with the controller methods.
const productStockRoutes = Router()

const productStockService = new ProductStockService()
const productStockController = new ProductStockController(productStockService)

productStockRoutes.get('/product-stocks', productStockController.getAllProductStocks)
productStockRoutes.get('/product-stocks/:id', productStockController.getProductStockById)
productStockRoutes.post('/product-stocks', productStockController.createProductStock)
productStockRoutes.put('/product-stocks/:id', productStockController.updateProductStock)
productStockRoutes.delete('/product-stocks/:id', productStockController.deleteProductStock)

export default productStockRoutes
