import React from "react";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../state/index";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/login",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = response.data;

        // Check if user is admin
        if (data.user.isAdmin) {
          // Dispatch login action to store token and user data in Redux state
          dispatch(
            login({
              user: data.user,
              accessToken: data.token,
            })
          );

          // Log the token and userId for verification
          console.log("Token after login:", data.token);
          console.log("User ID after login:", data.user._id); // Assuming userId is stored in data.user._id

          // Navigate to dashboard after successful login
          navigate("/dashboard");
        } else {
          console.log("User is not admin. Access denied.");
          // Handle non-admin access scenario (e.g., show error message)
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onFocus={(e) => {
            e.target.setAttribute("autocomplete", "off"); // Disable browser autocomplete
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
              color: "black",
            },
            "& .MuiInputBase-input": {
              backgroundColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "white",
              color: "black",
            },
            "& .MuiInputBase-input": {
              backgroundColor: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
              "&.Mui-focused": {
                color: "black",
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "darkgray",
            },
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
