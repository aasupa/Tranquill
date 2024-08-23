import express from "express";
import { createPost,getFeedPosts, getUserPosts, likePost, addComment, updatePost, deletePost,searchPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
//import multer from multer;
const router = express.Router();



//const upload = multer({ dest: 'public/assets/' });

//router.post("/", verifyToken, upload.single('picture'), createPost);
//router.post("/", verifyToken, createPost);
// GET /posts (for feed)
router.get("/", verifyToken, getFeedPosts);


// GET /posts/:userId/posts (for user-specific posts)
router.get("/:userId/posts", verifyToken, getUserPosts);

router.get("/search",verifyToken, searchPosts); // New search route

/* Like */
router.patch("/:id/like", verifyToken, likePost);

// POST /posts/:id/comment (to add a comment to a post)
router.post("/:id/comment", verifyToken, addComment);



router.patch("/:id",verifyToken, updatePost); 
router.delete("/:id",verifyToken, deletePost);

// Optionally, add route for updating a post
// router.patch("/:id", verifyToken, updatePost);

export default router;
