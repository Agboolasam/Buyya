import express from "express";
import Order from "../models/model";
import createOrder from "../controllers/orderController";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 4 } = req.query;
    let offset = (page - 1) * limit;

    const { row: orders, count: total } = await Order.findAndCountAll({
      where: { UserId: req.user.id },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error Fetching Orders" });
  }
});

router.post("/create", async (req, res) => {
  try {
    await createOrder(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
});

export default router;
