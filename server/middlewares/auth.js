import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/model";

dotenv.config();

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const refreshToken = req.body.refreshToken;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token is required" });
  }
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Please Login" });
  }
  jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (!err) {
      req.user = decoded;
      return next();
    }

    if (err.name === "TokenExpiredError") {
      if (!refreshToken) {
        return res.status(401).json({
          error: "Please Login",
          redirectToLogin: true,
        });
      }

      try {
        const decoded = await jwt.verify(
          refreshToken,
          process.env.REFRESH_SECRET
        );

        const user = await User.findByPk(decoded.id);
        if (!user) {
          return res.status(403).json({
            error: "session ended, Please Login",
            redirectToLogin: true,
          });
        }

        const newAccessToken = await jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        const newRefreshToken = await jwt.sign(
          { id: user.id, role: user.role },
          process.env.REFRESH_SECRET,
          { expiresIn: "7d" }
        );

        user.refreshTokenToken = newRefreshToken;
        await user.save();
        user.accessToken = newAccessToken;

        res.setHeader("x-access-token", newAccessToken);
        res.setHeader("x-refresh-token", newRefreshToken);
        req.user = user;
        next();
      } catch (err) {
        return res.status(403).json({
          error: "Please Login ",
          redirectToLogin: true,
        });
      }

      return res.status(403).json({
        error: "Please Login ",
        redirectToLogin: true,
      });
    }
  });
};

const isAdmin = (req, res) => {
  const role = req.user.role;
  if (!role === "ADMIN") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  return next();
};

export { verifyToken, isAdmin };
