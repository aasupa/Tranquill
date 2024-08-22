import express from "express";
import { getNotifications, updateNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.get('/:userId', getNotifications);

// Update a notification
router.put('/update/:taskId', updateNotification);

export default router;