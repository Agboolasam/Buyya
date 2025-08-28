import { DataTypes } from "sequelize";
import sql from "../config/database.js";

const User = sql.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("USER", "ADMIN"),
    defaultValue: "USER",
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default User;
