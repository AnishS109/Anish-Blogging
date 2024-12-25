import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import { Email, Phone, LocationOn, Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import Layout from "../../Layout/Layout";

const Contact = () => {
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMsg({ ...msg, [name]: value });
  };

  const handleInputClear = () => {
    setMsg({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Layout>
      {/* Contact Header */}
      <Box sx={{ textAlign: "center", padding: "2rem", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Have questions or want to connect? We'd love to hear from you.
        </Typography>
      </Box>

      {/* Contact Form and Info Section */}
      <Box sx={{ padding: "3rem 2rem", backgroundColor: "#fff" }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Contact Form
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={msg.name}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                value={msg.email}
                onChange={handleInputChange}
                variant="outlined"
                type="email"
                required
              />
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={msg.message}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={4}
                required
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#1E88E5",
                  "&:hover": { backgroundColor: "#1565C0" },
                }}
                onClick={handleInputClear}
              >
                Send Message
              </Button>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Reach Us
            </Typography>
            <Box sx={{ marginTop: "1rem", lineHeight: "2rem" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Email color="primary" />
                <Typography variant="body1">anishsaini9098@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Phone color="primary" />
                <Typography variant="body1">+91 90988 69975</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <LocationOn color="primary" />
                <Typography variant="body1">Indore, Madhya Pradesh, India</Typography>
              </Box>
            </Box>

            {/* Social Media Links */}
            <Box sx={{ marginTop: "2rem" }}>
              <Typography variant="h6" fontWeight="bold">
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                <IconButton
                  href="https://www.instagram.com"
                  target="_blank"
                  sx={{ color: "#E4405F" }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  href="https://www.linkedin.com/in/anish-saini9098"
                  target="_blank"
                  sx={{ color: "#0077B5" }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  href="https://github.com/AnishS109/Blogging-Website.git"
                  target="_blank"
                  sx={{ color: "gray" }}
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Contact;
