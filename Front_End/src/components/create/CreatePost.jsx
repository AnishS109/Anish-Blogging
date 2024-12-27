import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Layout from "../../Layout/Layout";
import { AddCircle as Add } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

import shortCut from "../../assets/shortCut.jpeg"

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    category: "",
    createdDate: new Date(),
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { account } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const placeholderImage =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const url = post.picture || placeholderImage;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);

        try {
          const response = await fetch("https://anish-blogging-2.onrender.com/file/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data = await response.json();
          setUploadedImage(data);
        } catch (error) {
          setErrorMsg("Image upload failed. Please try again.");
          setDialogOpen(true);
        }
      }
    };

    uploadImage();

    post.category = location.search?.split("=")[1] || "All";
    post.username = account.username;
  }, [file]);

  useEffect(() => {
    if (uploadedImage) {
      post.picture = uploadedImage;
    }
  }, [uploadedImage]);

  const savePost = async () => {
    
    if(post.username === ""){
      setErrorMsg("Username not found, please Login again to create an post")
      return setDialogOpen(true);
    }

    try {
      const response = await fetch("https://anish-blogging-2.onrender.com/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setErrorMsg(data.message || "An error occurred while creating the post.");
        setDialogOpen(true);
      }

      setPost({
        title: "",
        description: "",
        picture: "",
        username: "",
        category: "",
        createdDate: new Date(),
      });
    } catch (error) {
      setErrorMsg("Failed to create post. Please try again.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Layout>
      {/* Outer Container */}
      <Box
        sx={{
          background: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {/* Form Card */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
            overflow: "hidden",
          }}
        >
          {/* Header Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "500px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <img
              src={url}
              alt="Header"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <label htmlFor="fileInput">
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                  color: "#333",
                  "&:hover": { bgcolor: "black", color: "white" },
                  transition: "all 0.3s ease",
                }}
                component="span"
              >
                <Add sx={{ fontSize: 36 }} />
              </IconButton>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Box>

          {/* Content Section */}
          <Box sx={{ padding: "24px 32px" }}>
            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                fontWeight: "600",
                color: "#333",
                textAlign: "center",
              }}
            >
              Create a New Blog Post
            </Typography>

            <Divider sx={{ mb: 3, bgcolor: "#ddd" }} />

            {/* Title Input */}
            <TextField
              label="Blog Title"
              name="title"
              placeholder="Enter a catchy title for your post"
              fullWidth
              variant="outlined"
              margin="normal"
              value={post.title}
              onChange={handleInputChange}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                },
              }}
            />

            {/* Description Input */}
            <TextField
              label="Blog Description"
              name="description"
              placeholder="Write an engaging description..."
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={6}
              value={post.description}
              onChange={handleInputChange}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                },
              }}
            />

            {/* Publish Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#141e30",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#243b55",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                  },
                }}
                onClick={savePost}
                disabled={!post.title || !post.description} // Disable if fields are empty
              >
                Publish Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Error Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <Typography sx={{ color: "red", textAlign: "center" }}>{errorMsg}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
    </Layout>
  );
};

export default CreatePost;
