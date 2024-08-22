import { Todo } from "../models/todo.js";

export const getNotifications = async (req, res, next) => {

    try {
        const { userId } = req.params;
        const now = new Date();
    
        // Find tasks with reminderTime that is close to now or in the past
        const notifications = await Todo.find({
          user: userId,
          reminderTime: { $lte: now },
          isCompleted: false
        });
    
        res.status(200).json({ success: true, notifications });
      } catch (error) {
        next(error);
      }
};

export const updateNotification = async (req, res, next) => {
    try {
      const { taskId } = req.params;
  
      // Update the notification
      const updatedTask = await Todo.findByIdAndUpdate(taskId, { reminderTime: null }, { new: true });
  
      if (!updatedTask) {
        return (console.log('task not found') );
      }
  
      res.status(200).json({
        success: true,
        message: "Reminder updated successfully",
        updatedTask
      });
    } catch (error) {
      next(error);
    }
  };