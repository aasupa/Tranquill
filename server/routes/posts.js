import express from "express";
import { getFeedPosts, getUserPosts, likePost, addComment, updatePost, deletePost,searchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
// import { getRecommendations } from "../controllers/recommender.js"; // New import
const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


router.get("/search",verifyToken, searchPosts); // New search route

/* Like */
router.patch("/:id/like", verifyToken, likePost);

// Add Comment
router.post('/:id/comment', addComment);

/* RECOMMENDATIONS */
// router.get("/recommendations/:userId", verifyToken, getRecommendations); // New route


router.patch("/:id",verifyToken, updatePost); 
router.delete("/:id",verifyToken, deletePost);


export default router;
