// import { updateUserInteractions } from "../Recommender_Module.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { format } from "date-fns";

/* CREATE */
/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description = "" } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Example logic to determine if the post is an admin post
    const isAdminPost = user.isAdmin; // Assuming user model has an isAdmin field
    let picturePath = req.file ? req.file.path : null;
    // Strip "public/assets" from the beginning of req.file.path if it exists
    picturePath = picturePath.replace(/^public\/assets\//, "");

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      isAdmin: isAdminPost, // Set isAdmin property based on admin criteria
    });

    await newPost.save();

    console.log("Saved picturePath:", picturePath); // Log the modified picturePath here

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Track interaction
    // updateUserInteractions(userId,id);

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* ADD COMMENT */
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId,
      username: `${user.firstName} ${user.lastName}`,
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE POST */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, description } = req.body;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own posts" });
    }

    post.description = description || post.description;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// / DELETE /posts/:id
// export const deletePost = async (req, res) => {
//   const postId = req.params.id;

//   try {
//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // Ensure user is authorized to delete the post
//     if (req.user.id !== post.userId && !req.user.isAdmin) {
//       return res.status(403).json({
//         error: "Unauthorized: You are not allowed to delete this post",
//       });
//     }

//     await post.remove(); // Remove the post

//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting post:", err.message);
//     res.status(500).json({ error: "Server error" }); // Handle other errors with a 500 status
//   }
// };
export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure req.user is populated and has the id property
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not authenticated" });
    }

    // Ensure user is authorized to delete the post
    if (req.user.id !== post.userId && !req.user.isAdmin) {
      return res.status(403).json({
        error: "Unauthorized: You are not allowed to delete this post",
      });
    }

    await post.remove(); // Remove the post

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
