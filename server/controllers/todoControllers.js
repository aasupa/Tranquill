//sad wala ho
import { Todo } from "../models/todo.js";
import mongoose from "mongoose";

// Add a new todo
export const newTodo = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Log user details to the console
    // console.log("User details from req.user (newTodo):", req.user);

    // Extract the user ID
    const userId = req.user;

    // Log the extracted user ID
    // console.log("Extracted user ID (newTodo):", userId);

    // Verify the type of userId
    // console.log("Type of userId (newTodo):", typeof userId);

    const todo = await Todo.create({
      title,
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
    const userId = req.user;
    console.log("User ID (getAllTodo):", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID not found" });
    }

    // Check if there are tasks in the database
    const tasks = await Todo.find({ user: userId });
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
    const task = await Todo.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not Found", 404));

    const updatedData = { ...req.body };

    if (req.body.isCompleted === undefined) {
      delete updatedData.isCompleted;
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.id,
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

// Delete a todo
export const deleteTodo = async (req, res, next) => {
  try {
    const task = await Todo.findById(req.params.id);

    // if (!task) return next(new ErrorHandler("Todo not Found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    await Todo.deleteOne();

    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
