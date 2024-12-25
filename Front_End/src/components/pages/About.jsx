import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Layout from "../../Layout/Layout";
import anishImg from "../../assets/anish.jpeg";

const About = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleAvatarClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 1000); 
  };

  return (
    <Layout>
      {/* Welcome Section */}
      <Box sx={{ textAlign: "center", padding: "2rem", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to <span style={{ color: "#ff9800" }}>IdeaVerse</span>
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          A platform where your ideas take shape. Created with passion and dedication by <strong>Anish Saini</strong>.
        </Typography>
      </Box>

      {/* About Anish Section */}
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
        }}
      >
        {/* Image Section with Animation */}
        <Box
          onClick={handleAvatarClick}
          sx={{
            position: "relative",
            cursor: "pointer",
            "&:hover img": {
              transform: "scale(1.1)",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
            },
            "& img": {
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            },
          }}
        >
          <Avatar
            alt="Anish Saini"
            src={anishImg}
            sx={{
              width: isClicked ? 270 : 200,
              height: isClicked ? 300 : 230,
              border: "3px solid #ff9800",
              transition: "width 0.5s ease, height 0.5s ease",
            }}
          />
        </Box>

        {/* Text Section */}
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Meet the Creator
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Hi! I'm <strong>Anish Saini</strong>, a passionate web developer and the solo creator of IdeaVerse. This
            project is a result of countless hours of hard work, coding, and a vision to create a space where ideas can
            be shared and celebrated.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            I specialize in React.js, Express.js, MongoDB, and Material-UI to craft modern and efficient web
            applications. Feel free to reach out for collaborations or feedback!
          </Typography>
        </Box>
      </Box>

      {/* Call-to-Action Section */}
      <Box sx={{ textAlign: "center", padding: "2rem", backgroundColor: "#212121", color: "#fff" }}>
        <Typography variant="h5" gutterBottom>
          Let's Build Something Great Together!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have questions, feedback, or want to collaborate? Reach out to me at{" "}
          <a href="mailto:anishsaini9098@gmail.com" style={{ color: "#FFC107", textDecoration: "none" }}>
            anishsaini9098@gmail.com
          </a>
        </Typography>
      </Box>
    </Layout>
  );
};

export default About;
