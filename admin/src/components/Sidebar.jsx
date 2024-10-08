import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  GroupsOutlined,
} from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined sx={{ color: "black", fontSize: "1.5rem" }} />,
  },
  {
    text: "Users",
    icon: <PeopleIcon sx={{ color: "black", fontSize: "1.5rem" }} />,
  },

  {
    text: "UsersBlog",
    icon: <GroupsOutlined sx={{ color: "black", fontSize: "1.5rem" }} />,
  },
  {
    text: "AddBlog",
    icon: <AddBoxIcon sx={{ color: "black", fontSize: "1.5rem" }} />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: "#e0f7fa", // Light blue background color
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h2" fontWeight="bold" color="black">
                    TRANQUIL
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                const isActiveItem = isActive === lcText;

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setIsActive(lcText);
                      }}
                      sx={{
                        backgroundColor: isActiveItem
                          ? "darkgray"
                          : "transparent",
                        padding: "1rem", // Increase padding for larger clickable area
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem", // Adjust left margin
                          color: "black",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="h5" // Use a larger variant for bigger text
                            fontSize="1.2rem" // Increase font size
                            color="black"
                          >
                            {text}
                          </Typography>
                        }
                        sx={{
                          color: "black",
                        }}
                      />
                      {isActiveItem && (
                        <ChevronRightOutlined
                          sx={{ color: "black", ml: "auto" }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem" width="100%">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0 3rem"
              alignItems="center"
            >
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
