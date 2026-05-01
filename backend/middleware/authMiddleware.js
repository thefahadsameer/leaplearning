const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /* 🔥 KEEP EXISTING LOGIC */
    req.user = decoded;

    /* 🔥 ADD SAFETY CHECK (NEW) */
    if (!req.user.email) {
      console.warn("⚠️ Email not found in token:", decoded);
      // Not blocking request — just warning
    }

    next(); // ✅ MUST EXIST
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;