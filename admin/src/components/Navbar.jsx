import React, { useState } from "react";
import {
  Menu as MenuIcon,
  ArrowDropDownOutlined,
  People as PeopleIcon,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, logout } from "state";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector((state) => state.global.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: "#e0f7fa", // Light blue background color
        boxShadow: "none",
        borderBottom: "1px solid lightgray", // Optional: Adds a border to the bottom of the navbar
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "0.5rem", // Reduced gap between icon and arrow
              }}
            >
              <PeopleIcon sx={{ color: "black", fontSize: "40px" }} />

              <Box textAlign="left" sx={{ ml: "0.5rem" }}>
                <Typography fontWeight="bold" fontSize="0.85rem">
                  {user.name}
                </Typography>
                <Typography fontSize="0.75rem">{user.occupation}</Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: "black", fontSize: "25px", ml: "-0.8rem" }} // Adjusted margin to bring arrow closer
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => dispatch(logout())}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
