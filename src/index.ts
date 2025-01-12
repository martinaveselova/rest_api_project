import express from 'express';
import { AppDataSource } from './data-source';
import itemRoutes from './routes/itemRoutes';

const app = express();

// If you need JSON body parsing
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Mount the router at /items
    app.use('/items', itemRoutes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
