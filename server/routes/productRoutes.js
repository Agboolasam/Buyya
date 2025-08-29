import express from "express";
import Product from "../models/model";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 4 } = req.query;

    let offset = (page - 1) * limit;

    const { row: products, count: total } = await Product.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
    res.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk({ id });
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
});

export default router;
