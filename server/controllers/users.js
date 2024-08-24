// import User from "../models/User.js";

// /* READ */
// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserFriends = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     console.log('User:', user);
//     if (!user || !user.friends) {
//       return res.status(404).json({ message: "User or friends not found" });
//     }

//     const friends = await Promise.all(
//       //user.friends.map((id) => User.findById(id))
//       user.friends.map(async (friendId) => {
//         const friend = await User.findById(friendId);
//         if (!friend) {
//           console.log(`Friend with ID ${friendId} not found`);
//         }
//         return friend;
//       })
//     );
//     console.log('Friends:', friends);
//     const formattedFriends = friends
//     .filter(friend => friend !== null)
//     .map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const addRemoveFriend = async (req, res) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);

//     if (!user || !friend) {
//       return res.status(404).json({ message: "User or friend not found" });
//     }

//     if (user.friends.includes(friendId)) {
//       user.friends = user.friends.filter((id) => id !== friendId);
//       friend.friends = friend.friends.filter((id) => id !== id);
//     } else {
//       user.friends.push(friendId);
//       friend.friends.push(id);
//     }
//     await user.save();
//     await friend.save();

//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );
//     const formattedFriends = friends
//     .filter(friend => friend !== null)
//     .map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );

//     res.status(200).json(formattedFriends);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     await user.remove();
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import User from "../models/User.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    // if(!user) throw new
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// export const deleteUser = async (req, res, next) => {
//   try {
//     console.log(req.params.id);

//     const user = await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       success: true,
//       message: "User has been deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('friends');
    console.log('User:', user);
    if (!user || !user.friends) {
      return res.status(404).json({ message: "User or friends not found" });
    }

     const friends = await Promise.all(
      //user.friends.map((id) => User.findById(id))
      user.friends.map(async (friendId) => {
        const friend = await User.findById(friendId);
        if (!friend) {
          console.log(`Friend with ID ${friendId} not found`);
        }
        return friend;
      })
    );
    console.log('Friends:', friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id.toString() !== friendId.toString());
      friend.friends = friend.friends.filter((id) => id.toString() !== id.toString());
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    // const friends = await Promise.all(
    //   user.friends.map((id) => User.findById(id))
    // );
    // const formattedFriends = friends.map(
    //   ({ _id, firstName, lastName, occupation, location, picturePath }) => {
    //     return { _id, firstName, lastName, occupation, location, picturePath };
    //   }
    // );
    const updatedFriends = await User.find({ _id: { $in: user.friends } });
    const formattedFriends = updatedFriends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );


    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const incrementProfileViews = async (req, res) => {
  console.log('PATCH /users/:id/view endpoint hit');
  try {
    const { id } = req.params;
    console.log('User ID:', id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId:', id);
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.viewedProfile = (user.viewedProfile || 0) + 1;
    await user.save();

    res.status(200).json({ viewedProfile: user.viewedProfile });
  } catch (error) {
    console.error('Error incrementing profile views:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserImpressions = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ userId: id });
    const impressions = posts.reduce((total, post) =>{

    const uniqueLikesCount = Object.keys(post.likes).length;
    return total + uniqueLikesCount;
    },0);
       

    res.status(200).json({ impressions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};