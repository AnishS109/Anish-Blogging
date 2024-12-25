import { Box, Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import { Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#212121",
        color: "#fff",
        padding: "40px 20px",
        textAlign: "center",
        marginTop: "auto",
        borderTop: "1px solid #444",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            About ideaVerse
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "16px", color: "grey" }}>
            ideaVerse is a creative platform where we share insightful blog posts, innovative ideas, and stories that spark meaningful conversations. Stay inspired, stay informed.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Stay Connected
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", mb: 3 }}>
            <NavLink to="/home" target="_blank" sx={{ color: "white" }}>
              <IconButton sx={{color:"grey"}}>
                <Instagram sx={{ fontSize: "30px", "&:hover": { color: "#E1306C" } }} />
              </IconButton>
            </NavLink>
            <Link href="https://www.linkedin.com/in/anish-saini9098" target="_blank" sx={{ color: "white" }}>
              <IconButton sx={{color:"grey"}}>
                <LinkedIn sx={{ fontSize: "30px", "&:hover": { color: "#0077B5" } }} />
              </IconButton>
            </Link>
            <Link href="https://github.com/AnishS109/Blogging-Website.git" target="_blank" sx={{ color: "white" }}>
              <IconButton sx={{color:"grey"}}>
                <GitHub sx={{ fontSize: "30px", "&:hover": { color: "white" } }} />
              </IconButton>
            </Link>
          </Box>
          <Typography variant="body2" sx={{ fontSize: "14px", color: "#888" }}>
            Follow us to stay updated on the latest blog posts, trends, and more.
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#444", my: 4 }} />

      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontSize: "14px", color: "#888", mb: 2 }}>
            ideaVerse is dedicated to providing valuable insights, inspiring ideas, and connecting passionate individuals. Let's create a community of thinkers and innovators.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "14px", color: "#888" }}>
            &copy; {new Date().getFullYear()} ideaVerse. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
