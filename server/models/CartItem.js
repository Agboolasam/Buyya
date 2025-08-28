import { DataTypes } from "sequelize";
import sql from "../config/database";
import Product from "./Product";
import Cart from "./Cart";

const CartItem = sql.define("CartItem", {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
});

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

export default CartItem;
