import React, { useEffect, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
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

  const columns = [];

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

        {/* Example button */}
        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
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
            <Typography variant="h5" color="black">
              Total Users
            </Typography>
          }
          value={stats.userdata}
        />
        {/* 
          // increase="+14%"
          // description="Since last month"
          // icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
     */}
        <StatBox
          title={
            <Typography variant="h5" color="black">
              Total Blogs
            </Typography>
          }
          value={stats.postdata}
          // increase="+21%"
          // description="Since last month"
          // icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        {/* Example DataGrid and BreakdownChart */}
        {/* <Box gridColumn="span 8" gridRow="span 3" backgroundColor={theme.palette.background.alt} p="1rem" borderRadius="0.55rem">
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        /> */}
        {/* <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        /> */}

        {/* Example DataGrid and BreakdownChart */}
        {/* <Box gridColumn="span 8" gridRow="span 3" sx={{ "& .MuiDataGrid-root": { border: "none", borderRadius: "5rem" }, "& .MuiDataGrid-cell": { borderBottom: "none" }, "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderBottom: "none" }, "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.background.alt }, "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.background.alt, color: theme.palette.secondary[100], borderTop: "none" }, "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${theme.palette.secondary[200]} !important` } }}>
          <DataGrid loading={isLoading || !data} getRowId={(row) => row._id} rows={(data && data.transactions) || []} columns={columns} />
        </Box>
        <Box gridColumn="span 4" gridRow="span 3" backgroundColor={theme.palette.background.alt} p="1.5rem" borderRadius="0.55rem">
          <BreakdownChart isDashboard={true} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
