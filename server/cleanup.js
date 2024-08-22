import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // Adjust the path to your User model

// Load environment variables from .env file
dotenv.config();

const cleanUpInvalidFriends = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const validFriends = [];
      for (const friendId of user.friends) {
        const friend = await User.findById(friendId);
        if (friend) {
          validFriends.push(friendId);
        }
      }

      if (validFriends.length !== user.friends.length) {
        user.friends = validFriends;
        await user.save();
        console.log(`Cleaned up friends list for user ${user._id}`);
      }
    }

    console.log("Cleanup completed");
  } catch (error) {
    console.error("Error during cleanup", error);
  }
};

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  console.error("MongoDB connection string is missing. Please set MONGO_URL in your .env file.");
  process.exit(1);
}

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
    cleanUpInvalidFriends().then(() => {
      mongoose.disconnect();
      console.log("Disconnected from database");
    });
  })
  .catch(err => {
    console.error("Database connection error", err);
  });
