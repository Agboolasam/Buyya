import { DataTypes } from "sequelize";
import sql from "../config/database";
import User from "./User";

const Order = sql.define("Order", {
  total: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM("PENDING", "COMPLETED", "CANCELLED"),
    defaultValue: "PENDING",
  },
});

User.hasMany(Order);
Order.belongsTo(User);

export default Order;
