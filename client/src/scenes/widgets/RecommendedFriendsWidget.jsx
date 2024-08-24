import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const RecommendedFriendsWidget = ({ userId }) => {
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token); // Access token from Redux store

  const getRecommendedFriends = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/recommend/friends?user_id=${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Use token from Redux store
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recommended friends");
      }
      const data = await response.json();
      if (!data) {
        throw new Error("Received null or empty response from server");
      }
      setRecommendedFriends(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecommendedFriends();
  }, [userId, token]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Recommended Friends
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {recommendedFriends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default RecommendedFriendsWidget;
