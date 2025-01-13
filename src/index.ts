import express from "express";
import { AppDataSource } from "./data-source";
import itemRoutes from "./routes/itemRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Mount the router at /items
    app.use("/api", itemRoutes);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
