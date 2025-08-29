import express from "express";
import dotenv from "dotenv";
import sql from "./models/model";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import { verifyToken, isAdmin } from "./middlewares/auth";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin", verifyToken, isAdmin, adminRoutes);

app.use("/product", verifyToken, productRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sql.authenticate();
    console.log("Database connected");

    await sql.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(` Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
})();
