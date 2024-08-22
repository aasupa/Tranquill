import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const backgroundImageUrl = process.env.PUBLIC_URL + "/assets/background1.jpg";

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography fontWeight="bold" fontSize="50px" color="black">
          Tranquil
        </Typography>

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Tranquil
          </Typography>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
