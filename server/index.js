import express from "express";
import dotenv from "dotenv";
import sql from "./config/database";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(` Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
})();
