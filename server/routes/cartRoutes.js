import express from "express";
import Cart from "../models/model";
import { addItem, removeItem, clearCart } from "../controllers/cartController";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: req.user.id } });
    if (cart.lenght == 0 || !cart) {
      return res.status(200).json({ message: "Cart is empty" });
    }
    return res.status(200).json({ message: "Successful", items: { cart } });
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
});

router.post("/add", async (req, res) => {
  try {
    await addItem(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
});

router.post("/remove:id", async (req, res) => {
  try {
    await removeItem(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    await clearCart(req, res);
  } catch (error) {
    res.status(500).json({ error: "Error occured" });
  }
});

export default router;
