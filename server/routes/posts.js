import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  addComment,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET /posts (for feed)
router.get("/", getFeedPosts);

// GET /posts/:userId/posts (for user-specific posts)
router.get("/:userId/posts", verifyToken, getUserPosts);

// PATCH /posts/:id/like (to like a post)
router.patch("/:id/like", verifyToken, likePost);

// POST /posts/:id/comment (to add a comment to a post)
router.post("/:id/comment", verifyToken, addComment);

// DELETE /posts/:id (to delete a post)
router.delete("/:id", verifyToken, deletePost);

// Optionally, add route for updating a post
// router.patch("/:id", verifyToken, updatePost);

export default router;
