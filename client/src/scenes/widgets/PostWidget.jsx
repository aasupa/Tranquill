import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "state";
import { setPost } from "state";
import { format } from "date-fns";
import axios from "axios";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId, text: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const editPost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PATCH", // Assuming PUT method for editing
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          description: editedDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setIsEditing(false);
      // Optionally, update local state or show feedback
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };


  const deletePost = async () => {
    // Implement delete post functionality here
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      //dispatch(setPost({ postId, delete: true })) //action to remove post
    dispatch(removePost({ postId }));
    // Optionally, handle UI updates or navigate after successful deletion
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return format(date, "MMMM dd, yyyy hh:mm a");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      {!isEditing ? (
        <>
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
        </>
      ) : (
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          sx={{ mt: "1rem" }}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${comment.userId}-${i}`} sx={{ mb: "1rem" }}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <strong>{comment.username}</strong> -{" "}
                {formatDate(comment.createdAt)}
              </Typography>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.text}
              </Typography>
            </Box>
          ))}
          <Divider />
          <Box mt="1rem">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={postComment}
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </Box>
        </Box>
      )}
      {/* Edit and Delete Buttons */}
      {loggedInUserId === postUserId && (
        <Box mt="1rem">
          {!isEditing ? (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit Post
            </Button>
          ) : (
            <Button variant="contained" onClick={editPost}>
              Save Changes
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            sx={{ ml: "1rem" }}
            onClick={deletePost}
            // Implement delete functionality here
          >
            Delete Post
          </Button>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
