// Defines the routes and hooks them up with the controller methods.

import { Router } from 'express'
import { ProductStockController } from '../controllers/productStockControllers'
import { ProductStockService } from '../services/productStockService'

const productStockRoutes = Router()

const productStockService = new ProductStockService()
const productStockController = new ProductStockController(productStockService)

productStockRoutes.get('/product-stocks', productStockController.getAllProductStocks.bind(productStockController))
productStockRoutes.get('/product-stocks:id', productStockController.getProductStockById.bind(productStockController))
productStockRoutes.post('/product-stocks', productStockController.createProductStock.bind(productStockController))
productStockRoutes.put('/product-stocks:id', productStockController.updateProductStock.bind(productStockController))
productStockRoutes.delete('/product-stocks:id', productStockController.deleteProductStock.bind(productStockController))

export default productStockRoutes
