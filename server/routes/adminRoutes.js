import express from "express";
import Product from "../models/model";

const router = express.Router();

router.post("/product/new", async (req, res) => {
  const data = req.body.product;
  const product = await Product.create(data);
  return res.status(201).json({
    message: "Product added succefully",
    id: product.id,
  });
});

router.put("/product/update/:id", async (req, res) => {
  const data = req.body.product;
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not Found" });
  }
  await product.update(data);
  return res.status(201).json({
    message: "Product Updated succefully",
    id: product.id,
  });
});

router.delete("/product/delete/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not Found" });
  }
  await product.destroy();
  return res.status(200).json({
    message: "Product Deleted succefully",
    id: product.id,
  });
});

export default router;
