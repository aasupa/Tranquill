import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Typography, useMediaQuery, IconButton, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import StatBox from "components/StatBox";
import axios from "axios";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
//import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
  });
  const [adminBlogs, setAdminBlogs] = useState([]); // State for admin blogs

  useEffect(() => {
    const getStatsAndBlogs = async () => {
      try {
        // Fetching statistics
        const statsResponse = await axios.get(
          `http://localhost:3001/api/total/data-count`
        );
        console.log("Statistics Response:", statsResponse.data);
        setStats(statsResponse.data);

        // Fetching admin posts
        const postsResponse = await axios.get(
          `http://localhost:3001/posts/6685fc045b693daa765fcc5f/posts` // Adjust URL if needed
        );
        console.log("Admin Posts Response:", postsResponse.data);
        setAdminBlogs(postsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    getStatsAndBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      // Remove the deleted post from the state
      setAdminBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e0f7fa", // Light blue background color
        padding: "20px", // Optional: Adds padding inside the Box
        minHeight: "900px", // Optional: Ensures the Box takes full viewport height minus margins
      }}
    >
      <FlexBetween>
        <Header
          title={
            <Typography variant="h2" fontWeight="bold" color="black">
              DASHBOARD
            </Typography>
          }
          subtitle={
            <Typography variant="h3" color="black">
              Welcome to your dashboard
            </Typography>
          }
        />
      </FlexBetween>

      <Box
        mt="30px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* StatBox examples */}
        <StatBox
          title={
            <Box display="flex" alignItems="center">
              <Typography variant="h4" color="black">
                Total Users
              </Typography>
              <PeopleIcon sx={{ color: "black", ml: 1 }} />
            </Box>
          }
          value={stats.userdata} // Corrected field name
        />
        <StatBox
          title={
            <Box display="flex" alignItems="center">
              <Typography variant="h4" color="black">
                Total Blogs
              </Typography>
              <LibraryBooksIcon sx={{ color: "black", ml: 2 }} />
            </Box>
          }
          value={stats.postdata} // Corrected field name
        />
        <Box
          gridColumn="span 12" // Makes the box span all columns
          mt="20px"
          p="20px"
          sx={{
            backgroundColor: "white", // Background color of the box
            borderRadius: "0.55rem", // Rounded corners
            height: "500px", // Fixed height for the large section
            overflowY: "auto", // Allows scrolling if content overflows
            display: "flex",
            flexDirection: "column",
            boxShadow: 3, // Optional: Adds shadow for better visual effect
            // Custom scrollbar styles
            "&::-webkit-scrollbar": {
              width: "6px", // Width of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // Background color of the track
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // Color of the scrollbar thumb
              borderRadius: "10px", // Round corners of the scrollbar thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // Color when hovering over the scrollbar
            },
          }}
        >
          {/* <Typography variant="h3" color="black" mb="20px">
            Admin Blogs
          </Typography> */}
          {/* Render admin blogs */}
          <Box >
            {adminBlogs.map((blog) => (
              <Box key={blog._id} mb="20px" sx={{
                 position: "relative" 
               }}>
                <Typography variant="h4" color="black">
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    {blog.firstName}
                  </span>
                  <span
                    style={{
                      marginLeft: "8px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {blog.lastName}
                  </span>
                </Typography>
                <Box
                  sx={{
                    mt: "10px",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="black"
                    sx={{
                      textAlign: "justify", // Justifies the text
                      width: "80%",
                    }}
                  >
                    {blog.description}
                  </Typography>
                  {/* {blog.picturePath && (
                    <img
                      src={`http://localhost:3001/${blog.picturePath}`}
                      alt={blog.title}
                      style={{
                        width: "100%", // Full width of the container
                        marginTop: "10px", // Space between the description and image
                        borderRadius: "8px", // Optional: Rounds the corners of the image
                      }}
                    />`http://localhost:3001/assets/${post.picturePath}`
                  )} */}
                  
                    <img
                      src={`http://localhost:3001/assets/${blog.picturePath}`}
                      alt={blog.title}
                      style={{
                        width: "20%", // Full width of the container
                        marginTop: "10px", // Space between the description and image
                        borderRadius: "8px", // Optional: Rounds the corners of the image
                      }}
                    />
                  

                </Box>
                {/* <IconButton
                  onClick={() => handleDelete(blog._id)}
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton> */}


                <Button
                    onClick={() => handleDelete(blog._id)}
                    sx={{
                      marginTop: "10px", // Space above the button
                      color: "white",

                      backgroundColor: "#c62828",
                      border: "1px solid #c62828", // Slightly thicker border
                      "&:hover": {
                        backgroundColor: "brown", // Darker red on hover
                      },
                      borderRadius: "5px", // Rounded corners
                      padding: "8px 8px", // Adjust padding for better appearance
                    }}
                  >
                    Delete Post
                </Button>

              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
