import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper
    >
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Post from Admin
        </Typography>
        <Typography color={medium}>post</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Data-Science</Typography>
        <Typography color={medium}>data@gmail.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        There's a reason homo-sapiens still exist today and
        the others didn't continue to evolve.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
