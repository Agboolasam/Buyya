import { DataTypes } from "sequelize";
import sql from "../config/database";

const Product = sql.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.INTEGER, allowNull: false }, // in cents
  inventory: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

export default Product;
