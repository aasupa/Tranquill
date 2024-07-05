import { Typography, Box } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle, titleColor, subtitleColor }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        color={titleColor || "secondary.100"}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={subtitleColor || "secondary.300"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
