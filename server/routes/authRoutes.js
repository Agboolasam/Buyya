import dotenv from "dotenv";
import express from "express";
import { login, register } from "../controllers/authController";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    login(req, res);
  } catch (err) {
    console.log("loginErr", err);
    res.status(500).json({ error: "Login Failed, Try again" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    register(req, res);
  } catch (err) {
    console.log("regErr", err);
    res.status(500).json({ error: "Sign up failed, Try again" });
  }
});

export default router;
