import React, { useState, useEffect } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import axios from "axios"; // Import axios for making HTTP requests

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        console.log("Fetched posts from backend:", response.data);

        const fetchedPosts = response.data || [];
        console.log("Parsed posts array:", fetchedPosts);

        // Filter posts where isAdmin is true
        const adminPosts = fetchedPosts.filter((post) => post.isAdmin);
        console.log("Admin posts:", adminPosts);

        setPosts(adminPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    console.log("Current state of posts:", posts);
  }, [posts]); // Log whenever posts state changes

  return (
    <>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => (
          <WidgetWrapper key={post._id}>
            <FlexBetween>
              <Typography color={dark} variant="h5" fontWeight="500">
                {post.firstName} {post.lastName}
              </Typography>
            </FlexBetween>
            <img
              width="100%"
              height="auto"
              alt="post"
              src={`http://localhost:3001/assets/${post.picturePath}`}
              style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <Typography color={medium} m="0.5rem 0">
              {post.description}
            </Typography>
          </WidgetWrapper>
        ))
      ) : (
        <Typography variant="body1">No posts found.</Typography>
      )}
    </>
  );
};

export default AdvertWidget;
