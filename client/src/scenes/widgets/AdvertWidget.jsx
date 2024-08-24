// import React, { useState, useEffect } from "react";
// import { Typography, useTheme, IconButton, Box, Button } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import WidgetWrapper from "components/WidgetWrapper";
// import axios from "axios"; // Import axios for making HTTP requests
// import CloseIcon from '@mui/icons-material/Close';

// const AdvertWidget = () => {
//   const { palette } = useTheme();
//   const dark = palette.neutral.dark;
//   const medium = palette.neutral.medium;

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [showFloatingWidget, setShowFloatingWidget] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/posts");
//         console.log("Fetched posts from backend:", response.data);

//         const fetchedPosts = response.data || [];
//         console.log("Parsed posts array:", fetchedPosts);

//         // Filter posts where isAdmin is true
//         const adminPosts = fetchedPosts.filter((post) => post.isAdmin);
//         console.log("Admin posts:", adminPosts);

//         setPosts(adminPosts);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   useEffect(() => {
//     console.log("Current state of posts:", posts);
//   }, [posts]); // Log whenever posts state changes

//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//     setShowFloatingWidget(true);
//   };

//   const handleCloseWidget = () => {
//     setShowFloatingWidget(false);
//     setSelectedPost(null);
//   };

//   return (
//     <>
//       {loading ? (
//         <Typography variant="body1">Loading...</Typography>
//       ) : posts && posts.length > 0 ? (
//         posts.map((post) => (
//           <WidgetWrapper key={post._id} style={{ cursor: 'pointer' }}>
//             <FlexBetween>
//               <Typography color={dark} variant="h5" fontWeight="500">
//                 {post.firstName} {post.lastName}
//               </Typography>
//             </FlexBetween>
//             <img
//               width="100%"
//               height="auto"
//               alt="post"
//               src={`http://localhost:3001/assets/${post.picturePath}`}
//               style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
//             />
//             <Typography color={medium} m="0.5rem 0">
//               {post.description}
//             </Typography>
//             <Button
//               onClick={() => handlePostClick(post)}
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               View Post
//             </Button>
//           </WidgetWrapper>
//         ))
//       ) : (
//         <Typography variant="body1">No posts found.</Typography>
//       )}

//       {/* Floating Widget */}
//       {showFloatingWidget && selectedPost && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '80%',
//             maxWidth: '600px',
//             maxHeight: '80vh', // Limit the maximum height to allow scrolling
//             backgroundColor: 'beige',
//             borderRadius: '8px',
//             boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
//             padding: '16px',
//             zIndex: 1000,
//             overflowY: 'auto', // Enable vertical scrolling
//           }}
//         >
//           <IconButton
//             onClick={handleCloseWidget}
//             sx={{ position: 'absolute', top: '8px', right: '8px', color: 'red' }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h6" fontWeight="500" mb="16px" color={"black"}>
//             {selectedPost.firstName} {selectedPost.lastName}
//           </Typography>
//           <img
//             width="100%"
//             height="auto"
//             alt="selected post"
//             src={`http://localhost:3001/assets/${selectedPost.picturePath}`}
//             style={{ borderRadius: "0.75rem", marginBottom: "16px" }}
//           />
//           <Typography variant="body1" color={"black"}>
//             {selectedPost.description}
//           </Typography>
//         </Box>
//       )}
//     </>
//   );
// };

// export default AdvertWidget;



import React, { useState, useEffect } from "react";
import { Typography, useTheme, IconButton, Box, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import axios from "axios"; // Import axios for making HTTP requests
import CloseIcon from '@mui/icons-material/Close';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showFloatingWidget, setShowFloatingWidget] = useState(false);

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

  const splitDescription = (description, maxWords) => {
    const words = description.split(/\s+/);
    if (words.length <= maxWords) {
      return [description, ""];
    }
    return [words.slice(0, maxWords).join(" "), words.slice(maxWords).join(" ")];
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowFloatingWidget(true);
  };

  const handleCloseWidget = () => {
    setShowFloatingWidget(false);
    setSelectedPost(null);
  };

  return (
    <>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : posts && posts.length > 0 ? (
        posts.map((post) => {
          const [previewDescription, fullDescription] = splitDescription(post.description, 20);

          return (
            <WidgetWrapper key={post._id} style={{ cursor: 'pointer' }}>
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
                {previewDescription}
                {fullDescription && (
                  <>
                    <Button
                      onClick={() => handlePostClick(post)}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, 
                        fontSize: '0.65rem', // Small font size
                        padding: '2px 3px',
                      }}
                    >
                      View Post
                    </Button>
                  </>
                )}
              </Typography>
            </WidgetWrapper>
          );
        })
      ) : (
        <Typography variant="body1">No posts found.</Typography>
      )}

      {/* Floating Widget */}
      {showFloatingWidget && selectedPost && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            maxHeight: '80vh', // Limit the maximum height to allow scrolling
            backgroundColor: 'beige',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            padding: '16px',
            zIndex: 1000,
            overflowY: 'auto', // Enable vertical scrolling
          }}
        >
          <IconButton
            onClick={handleCloseWidget}
            sx={{ position: 'absolute', top: '8px', right: '8px', color: 'red' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="500" mb="16px" color={"black"}>
            {selectedPost.firstName} {selectedPost.lastName}
          </Typography>
          <img
            width="100%"
            height="auto"
            alt="selected post"
            src={`http://localhost:3001/assets/${selectedPost.picturePath}`}
            style={{ borderRadius: "0.75rem", marginBottom: "16px" }}
          />
          <Typography variant="body1" color={"black"}>
            {selectedPost.description}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default AdvertWidget;
