import {
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  sql,
} from "../models/model";

const createOrder = async (req, res) => {
  const UserId = req.user.id;
  const t = await sql.transaction();
  try {
    const cartItems = await CartItem.findAll({
      where: { UserId: UserId },
      include: [Product],
      transaction: t,
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = Order.create({ UserId, total: 0 }, { transaction: t });

    let total = 0;

    for (const item of cartItems) {
      if (item.quantity > item.Product.inventory) {
        await t.rollback();
        return res
          .status(400)
          .json({ message: `Not enough stock for ${item.Product.name}` });
      }
      await OrderItem.create(
        {
          orderId: order.id,
          ProductId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        },
        { transaction: t }
      );
      total += item.quantity * item.Product.price;
      await item.Product.update(
        { stock: item.Product.inventory - item.quantity },
        { transaction: t }
      );

      await order.save({ transaction: t });
    }
    await CartItem.destroy({
      where: { UserId: UserId },
      transaction: t,
    });

    await t.commit();
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ message: "Error creating order" });
  }
};

export default createOrder;
