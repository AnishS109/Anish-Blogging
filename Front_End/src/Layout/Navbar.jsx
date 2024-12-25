import { AppBar, Toolbar, Typography, Box, Button, Dialog, DialogActions, DialogContent, Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate, NavLink } from "react-router-dom";
import { Menu as MenuIcon, ExitToApp, Lightbulb } from "@mui/icons-material";
import { useContext, useState } from "react";
import { DataContext } from "../Context/DataProvider";

const Navbar = () => {
  // Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Logout Dialog State
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setIsAuthenticated } = useContext(DataContext);

  const handleConfirmLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const drawer = (
    <Box sx={{ width: 240, bgcolor: "#2c2c2c", color: "#fff", display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6" sx={{ my: 3, fontWeight: 'bold', color: "#ff9800", textAlign: 'center' }}>
        ideaVerse
      </Typography>
      <Divider sx={{ mb: 2, bgcolor: "#ff9800" }} />
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent:"center",
        flexGrow: 1,
      }}>
        <List sx={{ 
          flexGrow: 1,
          width: "100%",
          }}>
          <ListItem button component={NavLink} to="/home" sx={{ color: "inherit", textDecoration: "none", width: "100%", justifyContent: "center"}}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={NavLink} to="/about" sx={{ color: "inherit", textDecoration: "none", width: "100%", justifyContent: "center" }}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={NavLink} to="/contact" sx={{ color: "inherit", textDecoration: "none", width: "100%", justifyContent: "center" }}>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem sx={{ marginTop: "auto", width: "100%", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                color: "white",
                bgcolor: "red",
                width: "100%",
                "&:hover": { bgcolor: "white", color: "red" },
              }}
              onClick={handleLogoutClick}
            >
              <ExitToApp sx={{ marginRight: "8px" }} /> Logout
            </Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        sx={{
          bgcolor: "#f5f5f5",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
          position: "static",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Lightbulb sx={{ color: "#ff9800", fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              ideaVerse
            </Typography>
          </Box>

          {/* Links on larger screens */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 3,
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              "& a": {
                textDecoration: "none",
                color: "inherit",
                fontSize: "16px",
                fontWeight: 500,
                position: "relative",
                transition: "color 0.3s",
              },
              "& a.active": {
                color: "#ff9800",
              },
              "& a::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                backgroundColor: "#ff9800",
                bottom: -4,
                left: 0,
                transition: "width 0.3s",
              },
              "& a:hover::after": {
                width: "100%",
              },
            }}
          >
            <NavLink to="/home" end>
              HOME
            </NavLink>
            <NavLink to="/about">
              ABOUT
            </NavLink>
            <NavLink to="/contact">
              CONTACT
            </NavLink>
          </Box>

          {/* Logout Button */}
          <Button
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              color: "white",
              ml: "30px",
              bgcolor: "red",
              "&:hover": {
                bgcolor: "White",
                color: "red",
              },
            }}
            onClick={handleLogoutClick}
          >
            LOGOUT
          </Button>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Button onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "#ff9800", fontSize: 30 }} />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmLogout} sx={{ color: "red" }}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Drawer for Mobile */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: "240px", bgcolor: "#2c2c2c", color: "#fff", paddingTop: "20px" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
