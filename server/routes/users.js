import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  deleteUser,
  incrementProfileViews,
  getUserImpressions
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id",verifyToken, getUser);
router.patch('/:id/view',verifyToken, incrementProfileViews);
router.get('/:id/impressions', getUserImpressions);

router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.delete("/:id", verifyToken, deleteUser);

export default router;
