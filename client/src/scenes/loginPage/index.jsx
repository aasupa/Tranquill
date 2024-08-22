import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const backgroundImageUrl = process.env.PUBLIC_URL + "/assets/background1.jpg";
  // const backgroundImageUrl = 'public/assets/background1.jpg'; // Reference your background image here
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
          minHeight: "100vh", // Ensure it covers the full viewport height
        }}
        //   width="100%"
        //  backgroundColor={theme.palette.background.alt}
        //   p="1rem 6%"
        //   textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="50px" color="primary">
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
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
