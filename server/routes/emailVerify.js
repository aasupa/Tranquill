// import express from "express";

// import User from '../models/User.js';

// const router = express.Router();

// router.get('/verify/:token', async (req, res) => {
//     try {
//       const { token } = req.params;
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id);
//       if (!user) return res.status(400).json({ msg: "Invalid link." });
  
//       user.emailVerified = true;
//       await user.save();
  
//       res.status(200).json({ msg: "Email verified successfully!" });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

//   export default router;