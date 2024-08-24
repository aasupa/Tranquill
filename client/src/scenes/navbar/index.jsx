import { useState, useRef, useEffect } from "react";
import axios from "axios";
import moment from 'moment';

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Gamepad } from "@mui/icons-material";
//import NotificationIcon from './NotificationIcon';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // Corrected state definition
  const [notifications, setNotifications] = useState([]);

  const [isNotificationWidgetVisible, setIsNotificationWidgetVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const searchBoxRef = useRef(null);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:3001/notifications/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newNotifications = response.data.notifications;
        setNotifications(newNotifications);

        // Check for reminders and show alerts
        newNotifications.forEach(notification => {
          if (notification.reminderTime && new Date(notification.reminderTime) <= new Date()) {
            Swal.fire({
              icon: "warning",
              title: "Task Reminder",
              text: `It's time to complete your task: ${notification.title}`,
              confirmButtonText: 'Go to tasks',
  preConfirm: () => {
    navigate("/todo"); // This will navigate to the /tasks route
  }
            });
            // Optionally update reminder time or remove notification
            axios.put(`http://localhost:3001/notifications/update/${notification.taskId}`);
          }
        });
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications(); // Initial fetch

    const interval = setInterval(() => {
      fetchNotifications(); // Periodic fetch every minute
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [user._id, token]); // Depend on user ID and token




  // Check if user is authenticated
  const isAuthenticated = !!user;


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // Empty dependency array

  // Handle rendering based on authentication status
  if (!isAuthenticated) {
    return null; // Return null if not authenticated to prevent rendering
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
  

  

  // Handle search
  const handleSearch = async () => {

    if (!token) {
      console.error('No token found');
      return;
  }
    try {
      const response = await axios.get(`http://localhost:3001/posts/search?searchTerm=${searchTerm}`,{
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
      
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };


  const toggleNotificationWidget = () => {
    setIsNotificationWidgetVisible(!isNotificationWidgetVisible);
  };

  return (
    <FlexBetween
      padding="1rem 1%"
      backgroundColor={alt}
      position="fixed"
      width="100%"
      height="10x"
      zIndex="1000"
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Tranquil
        </Typography>
        {isNonMobileScreens && (
          <Box position="relative">
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase
                placeholder="Search by name.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowResults(true)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </FlexBetween>

            {/* Render search results */}
            {showResults && searchResults.length > 0 && (
              <Box
                ref={searchBoxRef}
                position="absolute"
                top="100%"
                left="0"
                backgroundColor={neutralLight}
                borderRadius="8px"
                boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
                maxHeight="300px"
                width="100%"
                zIndex="1000"
                sx={{ overflowY: "auto" }}
              >
                {searchResults.map((result) => (
                  <Box
                    key={result._id}
                    display="flex"
                    alignItems="center"
                    padding="0.5rem"
                    borderBottom="1px solid #ddd"
                    onClick={() => { handleProfileClick(result.userId)
                       console.log(`Navigating to profile with ID: ${result.userId}`);
                       console.log(result.userPicturePath);
                       console.log(`Image URL: http://localhost:3001/assets/${result.userPicturePath}`);
                       // navigate(`/profile/${result._id}`)
                    }}
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f5f5f5" } }}
                  >
                    <img
                      src={`http://localhost:3001/assets/${result.userPicturePath}`}
                      alt=""
                      onError={(e) => e.target.src = '/assets/p5.jpeg'}
                      style={{ borderRadius: "50%", width: "40px", height: "40px", marginRight: "0.5rem" }}
                    />
                    <Typography>{`${result.firstName} ${result.lastName}`}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 1.4rem, 2rem)"
            color="dark"
            onClick={() => navigate("/todo")}
            sx={{
              "&:hover": {
                color: dark,
                cursor: "pointer",
              },
            }}
          >
            My ToDo
          </Typography>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />

          <IconButton onClick={toggleNotificationWidget}>
            <Notifications sx={{ fontSize: "25px" }} />
            {notifications.length > 0 && (
              <Box
                position="absolute"
                top="0"
                right="0"
                bgcolor="red"
                borderRadius="50%"
                width="12px"
                height="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="10px"
              >
                {notifications.length}
              </Box>
            )}
          </IconButton>


          {isNotificationWidgetVisible && (
            <Box
              position="absolute"
              top="50px" // Adjust based on the position of your notification icon
              right= "15px"
              bgcolor="beige"
              borderRadius="8px"
              boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
              width="320px" // Adjust width as needed
              maxHeight="500px" // Adjust height as needed
              overflowY="auto"
              zIndex="1000"
            >
              <Typography
                variant="h6"
                sx={{ padding: "0.5rem", borderBottom: "2px solid #666666", color: "Brown" }}
              >
                Notifications
              </Typography>
              {notifications.length === 0 ? (
                <Typography
                  sx={{ padding: "1rem", textAlign: "center", color: "black" }}
                >
                  No notifications!
                </Typography>
              ) : (
                notifications.map((notification) => (
                  <Box
                    key={notification._id}
                    display="flex"
                    flexDirection="grid"
                    padding="1 px"
                    borderBottom="1px solid #ddd"
                    backgroundColor="white"
                    borderRadius={2}
                  >
                    <Typography 
                    sx={{ padding: "1rem",  color: "black" }}
                    > Reminder! Incomplete task :   {notification.title} </Typography>
                    <Typography variant="body2"
                     sx={{ padding: "1rem",  color: "black", paddingRight: "0.5rem", }}
                    > 
                      {moment(notification.reminderTime).format("YYYY-MM-DD HH:mm")}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          )}
          
            {/* <Gamepad sx={{ color: "#f2f2f2" }}
            onClick={() => navigate('/Explore/${userId}')}
            /> */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* <Message sx={{ fontSize: "25px" }} /> */}
            <IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
              {notifications.length > 0 && (
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  bgcolor="red"
                  borderRadius="50%"
                  width="12px"
                  height="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="10px"
                >
                  {notifications.length}
                </Box>
              )}
            </IconButton>
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
