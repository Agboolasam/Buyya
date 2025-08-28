import jwt from "jsonwebtoken";
import User from "../models/model";
import bcrypt from "bcrypt";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || email == "" || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!password || password == "") {
    return res.status(400).json({ message: "Invalid email" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be atleast 8 characters long and must contain Uppercase, Lowercase, number and special character",
    });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({
    message: "Successful",
    user: {
      id: user.id,
      name: user.fullName,
      email: email,
      tokens: { accessToken, refreshToken },
    },
  });
};

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (!fullName || fullName == "") {
    return res.status(400).json({ message: "name cannot be empty" });
  }

  if (!email || email == "" || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!password || password == "") {
    return res.status(400).json({ message: "Invalid email" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be atleast 8 characters long and must contain Uppercase, Lowercase, number and special character",
    });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res
      .status(409)
      .json({ message: "Email has been registered by another user" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.create({
    fullName,
    email,
    password: hashedPassword,
    role: role || "USER",
  });
  res.status(201).json({ message: "Succesful" });
};

export { login, register };
