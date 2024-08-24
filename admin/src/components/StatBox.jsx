import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({
  title,
  value,
  titleStyle,
  valueStyle,
  increase,
  icon,
  description,
  sx, // Accept custom styles via sx prop
}) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor="white" // Background color
      borderRadius="0.55rem"
      sx={sx} // Apply custom styles passed via the sx prop
    >
      <FlexBetween>
        <Typography variant="h6" sx={titleStyle}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography variant="h3" fontWeight="600" sx={valueStyle}>
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          // sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;