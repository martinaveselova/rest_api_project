import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import itemRoutes from './routes/itemRoutes'
import orderRoutes from './routes/orderRoutes'

const app = express()
app.use(express.json())

const startServer = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Data source has been initialized!')

    // mount the router at items
    app.use('/api', itemRoutes, orderRoutes)

    // start the server
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Error during Data Source initialization:', error)
  }
}

startServer()
