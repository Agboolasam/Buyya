import { Cart, CartItem, sql } from "../models/model";

const addItem = async (req, res) => {
  const t = sql.transaction();
  const cart = Cart.findOne(
    { where: { UserId: req.user.id } },
    { transaction: t }
  );

  const productId = req.body.productId;
  try {
    let cartItem = await CartItem.findOne(
      {
        where: { CartId: cart.id, ProductId: productId },
      },
      { transaction: t }
    );

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create(
        {
          CartId: cart.id,
          ProductId: productId,
          quantity,
        },
        { transaction: t }
      );
    }

    await t.commit();

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Error Occured" });
  }
};
const removeItem = async (req, res) => {
  const t = sql.transaction();
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      transaction: t,
    });
    if (cart) {
      await CartItem.destroy({
        where: { cartId: cart.id, ProductId: req.params.query },
        transaction: t,
      });
    }

    await t.commit();

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Error Occured" });
  }
};

const clearCart = async (req, res) => {
  const t = sql.transaction();
  try {
    const cart = await Cart.findOne({
      where: { UserId: req.user.id },
      transaction: t,
    });
    if (cart) {
      await CartItem.destroy({
        where: { CartId: cart.id },
        transaction: t,
      });
    }

    await t.commit();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Error Occured" });
  }
};

export { addItem, removeItem, clearCart };
