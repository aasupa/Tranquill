import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordInteraction } from "../../utils/api";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import Recommendations from "../../components/Recommendations"; // Assuming you have this component

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts || []); // Ensure posts is an array
  const token = useSelector((state) => state.token);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        dispatch(setPosts({ posts: [] })); // Handle the case where data is not an array
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      dispatch(setPosts({ posts: [] })); // Set an empty array on error
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        dispatch(setPosts({ posts: [] })); // Handle the case where data is not an array
      }
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
      dispatch(setPosts({ posts: [] })); // Set an empty array on error
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // getRecommendedPosts(); // If you need recommendations
  }, [isProfile, userId, token, dispatch]);

  const handlePostView = async (postId) => {
    await recordInteraction(userId, postId, token);
    // Optionally refresh recommendations
    // getRecommendedPosts();
  };

  if (!Array.isArray(posts)) {
    // Handle unexpected non-array posts state
    console.error("Posts data is not an array:", posts);
    return null;
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              onView={() => handlePostView(_id)} // Record interaction when the post is viewed
            />
          )
        )
      ) : (
        <p>No posts available.</p> // Display a message if no posts are available
      )}
      {/* Uncomment this if you want to show recommended posts */}
      {/* <Recommendations posts={recommendedPosts} /> */}
    </>
  );
};

export default PostsWidget;
