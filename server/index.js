import express from "express";
import dotenv from "dotenv";
import sql from "./models/model";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import { verifyToken, isAdmin } from "./middlewares/auth";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import cartRoutes from "./routes/cartRoutes";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin", verifyToken, isAdmin, adminRoutes);

app.use("/api/product", verifyToken, productRoutes);

app.use("/api/order", verifyToken, orderRoutes);

app.use("/api/cart", verifyToken, cartRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Buyya E-commerce API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      products: "/api/product",
      orders: "/api/order",
      cart: "/api/cart",
    },
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

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
