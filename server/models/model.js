import sql from "../config/database";
import Product from "./Product";
import User from "./User";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Order from "./Order";
import OrderItem from "./OrderItem";

export default sql;
export { User, Product, Cart, CartItem, Order, OrderItem };
