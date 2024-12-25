import { Box, Typography } from "@mui/material";
import BannerIMG from "../../assets/Banner2.jpeg";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${BannerIMG})`,
        height: "35vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)", 
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            textShadow: "4px 4px 6px rgba(0, 0, 0, 0.8)",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
            mb: 2,
          }}
        >
          IDEAVERSE
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            textShadow: "4px 4px 6px rgba(0, 0, 0, 0.8)",
            fontSize: { xs: "3rem", sm: "4rem", md: "5rem" },
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          BLOG
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
