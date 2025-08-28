import { Sequelize } from "sequelize";
import { dotenv } from "dotenv";

dotenv.config();

const sql = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
});

export default sql;
