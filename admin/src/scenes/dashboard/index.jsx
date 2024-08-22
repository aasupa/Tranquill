import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Typography, useMediaQuery } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import StatBox from "components/StatBox";
import axios from "axios";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Dashboard = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [stats, setStats] = useState({
    users: 0,
    bus: 0,
  });

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/total/data-count`
        );
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getStats();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={
            <Typography variant="h2" fontWeight="bold" color="black">
              DASHBOARD
            </Typography>
          }
          subtitle={
            <Typography variant="h4" color="black">
              Welcome to your dashboard
            </Typography>
          }
        />
      </FlexBetween>

      <Box
        mt="20px"
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
              <PeopleIcon sx={{ color: "black", ml: 2 }} />
            </Box>
          }
          value={stats.userdata}
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
          value={stats.postdata}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
