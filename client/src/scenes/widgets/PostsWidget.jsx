import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordInteraction } from "../../utils/api";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import Recommendations from "../../components/Recommendations"; // Assuming you have this component

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  // const [recommendedPosts, setRecommendedPosts] = useState([]);

  
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // const getRecommendedPosts = async () => {

  //   try {
  //     const response = await fetch(
  //         `http://localhost:3001/api/recommend/hybrid?${userId}`,
  //         {
  //             method: "GET",
  //             headers: { Authorization: `Bearer ${token}` },
  //         }
  //     );
  //     const data = await response.json();
  //     setRecommendedPosts(data); // Update state with fetched data
  // } catch (error) {
  //     console.error("Error fetching recommended posts:", error);
  // }
  // };



  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
     
    }
    // getRecommendedPosts();
  }, []); // eslint-disable-next-line

  const handlePostView = async (postId) => {
    await recordInteraction(userId, postId, token);
    // // Optionally refresh recommendations
    // getRecommendedPosts(); 
  };

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {sortedPosts.map(
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
      )}
      <Recommendations userId={userId} />
   { /*  <Recommendations posts={recommendedPosts} /> */}{/* Display recommended posts */}
    </>
  );
};

export default PostsWidget;