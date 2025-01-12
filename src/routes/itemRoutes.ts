import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Item } from '../entities/item';

const itemRoutes = Router();

itemRoutes.get('/', async (req, res) => {
  try {
    const itemRepo = AppDataSource.getRepository(Item);
    const items = await itemRepo.find();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching items', error });
  }
});

export default itemRoutes;
