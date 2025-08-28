import sql from "../config/database";
import User from "./User";

const Cart = sql.define("Cart", {});

User.hasOne(Cart);
Cart.belongsTo(User);

export default Cart;
