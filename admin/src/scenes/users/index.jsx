import React, { useEffect, useState } from "react";
import axios from "axios";
import "./users.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      // Filter out admin users
      const filteredUsers = response.data.users.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      // Filter out the deleted user from the local state
      setUsers(users.filter((user) => user._id !== userId));
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Users</h2>
      <table style={{ width: "100%", backgroundColor: "#e0f7fa" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Picture Path</th>
            <th>Friends</th>
            <th>Location</th>
            <th>Occupation</th>
            <th>Viewed Profile</th>
            <th>Impressions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.picturePath}</td>
              <td>{user.friends.join(", ")}</td>
              <td>{user.location}</td>
              <td>{user.occupation}</td>
              <td>{user.viewedProfile}</td>
              <td>{user.impressions}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
