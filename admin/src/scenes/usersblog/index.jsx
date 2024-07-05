import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/posts");
        console.log("Fetched blogs:", response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };
  const handleDelete = async (id) => {
    console.log("Deleting blog with ID:", id); // Ensure 'id' is defined and correct
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`);
      console.log("Delete response:", response.data);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      console.log(`Blog with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting blog with ID ${id}:`, error);
      // Handle specific errors or set an error state
      setError("Failed to delete blog. Please try again later.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Picture Path</th>
              <th>User Picture Path</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Version</th>
              <th>Tags</th>
              <th>View Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.userId}</td>
                <td>{blog.firstName}</td>
                <td>{blog.lastName}</td>
                <td>{blog.location}</td>
                <td>{blog.description}</td>
                <td>{blog.picturePath}</td>
                <td>{blog.userPicturePath}</td>
                <td>{Object.keys(blog.likes).length}</td>
                <td>
                  <ul>
                    {blog.comments.map((comment, index) => (
                      <li key={index}>
                        <div>
                          <strong>Username:</strong> {comment.username}
                        </div>
                        <div>
                          <strong>User ID:</strong> {comment.userId}
                        </div>
                        <div>
                          <strong>Comment:</strong> {comment.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{blog.__v}</td>
                <td>{blog.tags.join(", ")}</td>
                <td>{blog.viewCount}</td>
                <td>
                  <button onClick={() => handleDelete(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BlogList;
