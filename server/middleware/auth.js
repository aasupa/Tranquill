import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      console.log("No token provided");
      // Allow access to posts even if no token is provided
      return next();
      //return res.status(403).send("Access Denied: No token provided"); // Proceed to the next middleware or route handler
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token:", verified);

    req.user = verified; // Set user information in req.user
    console.log("User information set in req.user:", req.user);

    // Check if isAdmin is true
    if (req.user.isAdmin) {
      console.log("User is admin, granting access to admin routes.");
      // Proceed to the next middleware or route handler for admin routes
      return next();
    }

    // For non-admin users, allow access to posts but restrict other admin routes
    console.log("User is not admin, allowing access to posts only.");
    return next();
  } catch (err) {
    console.error("Error verifying token:", err.message);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res.status(500).json({ error: err.message });
  }
};

