//sad wala ho
import { Todo } from "../models/todo.js";
import mongoose from "mongoose";

// Add a new todo
export const newTodo = async (req, res, next) => {
  try {
    const { title, reminderTime } = req.body;
    const userId = req.user.id;

    let parsedReminderTime;
    if (reminderTime) {
      const isValidDate = Date.parse(reminderTime);
      if (isNaN(isValidDate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid reminder time format. Please use YYYY-MM-DD HH:mm format.",
        });
      }
      parsedReminderTime = new Date(reminderTime);
    }


    const todo = await Todo.create({
      title,
      reminderTime: parsedReminderTime,
      user: mongoose.Types.ObjectId(userId),
    });

    res.status(201).json({
      success: true,
      message: "Todo Added Successfully",
      todo,
    });
  } catch (error) {
    console.error("Error in newTodo:", error);
    next(error);
  }
};

// Get all todos
export const getAllTodo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("User ID (getAllTodo):", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    // Check if there are tasks in the database
    const tasks = await Todo.find({ user: mongoose.Types.ObjectId(userId)});
    console.log("Tasks for user (getAllTodo):", tasks);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// Update a todo
export const updateTodo = async (req, res, next) => {
  try {
    // Extract the task ID from the route parameters
    const taskId = req.params.id;

    // Log the task ID for debugging purposes
    console.log("Task ID (updateTodo):", taskId);

    // Check if taskId is undefined
    if (!taskId) {
      return res.status(400).json({ success: false, message: "Task ID not provided" });
    }

    // Validate that taskId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }

    const task = await Todo.findById(taskId);

    if (!task) return res.status(404).json({ success: false, message: "Task not Found" });

    const updatedData = { ...req.body };

    if (req.body.reminderTime) {
      const isValidDate = Date.parse(req.body.reminderTime);
      if (isNaN(isValidDate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid reminder time format. Please use YYYY-MM-DD HH:mm format.",
        });
      }
      updatedData.reminderTime = new Date(req.body.reminderTime);
    }

    if (req.body.isCompleted === undefined) {
      delete updatedData.isCompleted;
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      updatedTask,
    });
  } catch (error) {
    next(error);
  }
};


// // Update a todo
// export const updateTodo = async (req, res, next) => {
//   try {
//     const task = await Todo.findById(req.params.id);

//     if (!task) return next(new ErrorHandler("Task not Found", 404));

//     const updatedData = { ...req.body };

//     if (req.body.reminderTime) {
//       const isValidDate = Date.parse(req.body.reminderTime);
//       if (isNaN(isValidDate)) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid reminder time format. Please use YYYY-MM-DD HH:mm format.",
//         });
//       }
//       updatedData.reminderTime = new Date(req.body.reminderTime);
//     }


//     if (req.body.isCompleted === undefined) {
//       delete updatedData.isCompleted;
//     }

//     const updatedTask = await Todo.findByIdAndUpdate(
//       req.params.id,
//       updatedData,
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Task Updated Successfully",
//       updatedTask,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Delete a todo
export const deleteTodo = async (req, res, next) => {
  try {

    const taskId = req.params.id;

    // Log the task ID for debugging purposes
    console.log("Task ID (deleteTodo):", taskId);

    // Check if taskId is undefined
    if (!taskId) {
      return res.status(400).json({ success: false, message: "Task ID not provided" });
    }

    // Validate that taskId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ success: false, message: "Invalid Task ID" });
    }



    const task = await Todo.findById(req.params.id);
    
    // if (!task) return next(new ErrorHandler("Todo not Found", 404));

   // task.isCompleted = !task.isCompleted;

   // await task.save();

    await Todo.deleteOne({_id: taskId});

    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
