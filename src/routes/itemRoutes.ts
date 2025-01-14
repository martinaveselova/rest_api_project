import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/item";

const itemRoutes = Router();

// Get list of all items
itemRoutes.get("/items", async (req, res) => {
  try {
    const itemRepo = AppDataSource.getRepository(Item);
    const items = await itemRepo.find();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching items", error });
  }
});

// Get an ID of item from DB
itemRoutes.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itemRepo = AppDataSource.getRepository(Item);

    const item = await itemRepo.findOneBy({ id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    return res.status(500).json({ message: "Error fetching item", error });
  }
});

// Endpoint POST - create a new item into db
itemRoutes.post("/items", async (req, res) => {
  try {
    const { name, quantity, price, lot } = req.body;
    
    // TypeORM to get the repository
    const itemRepo = AppDataSource.getRepository(Item);

    // Create a new Item instance with the provided data
    const newItem = itemRepo.create({
      name,
      quantity,
      price,
      lot,
    });

    // Save the new item to the database
    const savedItem = await itemRepo.save(newItem);

    return res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating item" });
  }
});

export default itemRoutes;
