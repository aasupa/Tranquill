import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";

const AddBlog = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { palette } = useTheme();

  const accessToken = useSelector((state) => state.global.accessToken);
  const user = useSelector((state) => state.global.user); // Assuming you have user object in your global state

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user data is available
    if (!user || !user._id || !user.firstName) {
      alert("Error: User data is null or missing expected properties.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) {
        formData.append("picture", image);
      }

      // Adding user information to the form data
      formData.append("userId", user._id);
      formData.append("firstName", user.firstName); // Assuming user has firstName

      const response = await axios.post(
        "http://localhost:3001/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Log the response data for debugging
      console.log("Response from server:", response.data);

      // Reset form after successful submission
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding blog:", error);

      if (error.response) {
        console.error("Server error:", error.response.data);
        alert("Server error: " + error.response.data.message);
      } else if (error.request) {
        console.error("Request error:", error.request);
        alert(
          "Request error: No response from server. Please try again later."
        );
      } else {
        console.error("Error details:", error.message);
        alert("Unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5">Add Blog</Typography>
        <TextField
          label="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <Dropzone
          acceptedFiles={[".jpg", ".jpeg", ".png"]}
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box mt={2}>
              <Box
                {...getRootProps()}
                border={`2px dashed ${palette.primary.main}`}
                p={2}
                sx={{ cursor: "pointer" }}
              >
                <input {...getInputProps()} />
                {image ? (
                  <div>
                    <Typography>{image.name}</Typography>
                    <IconButton onClick={() => setImage(null)}>
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                ) : (
                  <Typography>
                    Drag 'n' drop an image here, or click to select files
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Dropzone>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!description}
          sx={{ mt: 2 }}
        >
          Add Blog
        </Button>
      </form>
    </Box>
  );
};

export default AddBlog;
