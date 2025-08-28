import { DataTypes } from "sequelize";
import sql from "../config/database";
import Product from "./Product";
import Order from "./Order";

const OrderItem = sql.define("OrderItem", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

export default OrderItem;
