import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/item";

const itemRoutes = Router();

// Get list of all items
itemRoutes.get("/", async (req, res) => {
  try {
    const itemRepo = AppDataSource.getRepository(Item);
    const items = await itemRepo.find();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching items", error });
  }
});

// Get an ID of item from DB
itemRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itemRepo = AppDataSource.getRepository(Item);

    // Convert the id from string to number
    const item = await itemRepo.findOneBy({ id: Number(id) });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching item", error });
  }
});

export default itemRoutes;
