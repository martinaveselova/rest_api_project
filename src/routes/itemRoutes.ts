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

// POST - create a new item into db
itemRoutes.post("/items", async (req, res) => {
  const { name, quantity, price, lot } = req.body;
  const itemRepo = AppDataSource.getRepository(Item);
  const newItem = itemRepo.create({
    name,
    quantity,
    price,
    lot,
  });
  const savedItem = await itemRepo.save(newItem);

  try {
    if (savedItem) {
      return res.status(201).json(savedItem);
    } else {
      return res.status(500).json({ message: "Item could not be saved" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating item" });
  }
});

// DELETE - delete item from db
itemRoutes.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itemRepo = AppDataSource.getRepository(Item);

    // Find the item by ID
    const item = await itemRepo.findOneBy({ id });

    // Check if the item exists
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    await itemRepo.remove(item);

    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    return res.status(500).json({ message: "Error deleting item", error });
  }
});


export default itemRoutes;
