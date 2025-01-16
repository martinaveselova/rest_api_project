import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Item } from "../entities/item";
import { itemValidator } from "../validators/itemValidator";

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
  try {
    // validate the request body using Joi
    const { error, value } = itemValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const itemRepo = AppDataSource.getRepository(Item);
    const newItem = itemRepo.create(value);
    const savedItem = await itemRepo.save(newItem);

    return res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating item" });
  }
});

// PUT - update item in db
itemRoutes.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // validate the request body using Joi
    const { error, value } = itemValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const itemRepo = AppDataSource.getRepository(Item);
    const item = await itemRepo.findOneBy({ id });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // check for duplicate EAN or SKU
    const existingItem = await itemRepo.findOne({
      where: [{ ean: value.ean }, { sku: value.sku }],
    });

    if (existingItem && existingItem.id !== id) {
      return res
        .status(409)
        .json({ message: "EAN or SKU already exists in the database." });
    }

    item.name = value.name;
    item.ean = value.ean;
    item.sku = value.sku;

    await itemRepo.save(item);

    return res.status(200).json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({ message: "Error updating item", error });
  }
});

// DELETE - delete item from db
itemRoutes.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itemRepo = AppDataSource.getRepository(Item);
    const item = await itemRepo.findOneBy({ id });

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
