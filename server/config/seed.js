import bcrypt from "bcrypt";
import sql from "./database";
import { User, Product } from "../models/model";

async function seed() {
  try {
    await sql.sync({ force: true }); // Reset database

    //  Admin User
    const salt = bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    await User.create({
      fullName: "Admin User",
      email: "admin@buyya.com",
      password: adminPassword,
      role: "ADMIN",
    });

    console.log("created admin user");
    // products
    await Product.bulkCreate([
      {
        name: "Laptop",
        description: "Powerful laptop",
        price: 1200,
        inventory: 10,
      },
      {
        name: "Phone",
        description: "Smartphone with nice camera",
        price: 800,
        inventory: 20,
      },
      {
        name: "Headphones",
        description: "Noise cancelling",
        price: 200,
        inventory: 15,
      },
      {
        name: "Keyboard",
        description: "Mechanical keyboard",
        price: 100,
        inventory: 25,
      },
      {
        name: "Mouse",
        description: "Wireless mouse",
        price: 50,
        inventory: 30,
      },
      {
        name: "Monitor",
        description: "27-inch 4K monitor",
        price: 400,
        inventory: 12,
      },
      {
        name: "Tablet",
        description: "10-inch tablet",
        price: 600,
        inventory: 18,
      },
      {
        name: "Smartwatch",
        description: "Water resistant",
        price: 250,
        inventory: 14,
      },
      {
        name: "Speaker",
        description: "Bluetooth speaker",
        price: 150,
        inventory: 22,
      },
      {
        name: "Webcam",
        description: "HD 1080p webcam",
        price: 80,
        inventory: 16,
      },
    ]);
    console.log("added products");
    console.log("seeding complete");
    process.exit(0);
  } catch (err) {
    console.log("error", err);
    process.exit(1);
  }
}

seed();
