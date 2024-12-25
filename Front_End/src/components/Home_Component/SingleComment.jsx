import React, { useContext, useState } from "react";
import { Box, Typography, IconButton, Avatar, Snackbar, Alert } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const SingleComment = ({ comment }) => {
  const { account } = useContext(DataContext);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

  const handleDelete = async (postTitle) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-com/del/${postTitle}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Comment deleted successfully!", type: "success" });
      } else {
        throw new Error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setSnackbar({ open: true, message: "Failed to delete the comment. Please try again.", type: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 2,
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        marginBottom: 2,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt={comment.name}
            sx={{
              bgcolor: "#1E88E5",
              color: "#fff",
              width: 40,
              height: 40,
              fontSize: "1rem",
            }}
          >
            {comment.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ color: "#424242" }}
            >
              {comment.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#757575", fontSize: "0.85rem" }}
            >
              {new Date(comment.date).toDateString()}
            </Typography>
          </Box>
        </Box>

        {comment.name === account.username && (
          <IconButton
            size="small"
            onClick={() => handleDelete(comment.postTitle)}
            sx={{
              color: "#f44336",
              "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
            }}
          >
            <Delete />
          </IconButton>
        )}
      </Box>

      {/* Comment Text Section */}
      <Box>
        <Typography
          variant="body1"
          sx={{
            color: "#424242",
            fontSize: "1rem",
            lineHeight: "1.5",
            wordBreak: "break-word",
          }}
        >
          {comment.commentText}
        </Typography>
      </Box>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SingleComment;
