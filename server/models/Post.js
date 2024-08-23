import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
      userId: String,
      username: String,
      firstName: String,
      lastName: String,
      text: String,
      createdAt: { type: Date, default: new Date() },
      default: [],
    }
  ],
    viewCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    recommended: {
      type: Boolean,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
