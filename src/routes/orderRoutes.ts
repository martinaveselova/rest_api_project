import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/orders";

const orderRoutes = Router();

orderRoutes.get("/orders", async (req, res) => {});

export default orderRoutes;
