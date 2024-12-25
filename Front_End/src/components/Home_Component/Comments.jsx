import { Box, Button, TextareaAutosize, Typography, Avatar } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import SingleComment from "./SingleComment";

const Comments = ({ post }) => {
  const placeholderImage = "https://static.thenounproject.com/png/12017-200.png";

  const { account } = useContext(DataContext);

  const [commentDetails, setCommentDetails] = useState({
    name: "",
    postTitle: "",
    commentText: "",
    date: new Date(),
  });

  const [comments, setComments] = useState([]);

  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get/comments/${post.title}`);
        const data = await response.json();
        if (response.ok) {
          setComments(data);
        }
      } catch (error) {
        console.error("ERROR WHILE FETCHING COMMENTS:", error);
      }
    };
    fetchComments();
  }, [post.title]);

  const handleChange = (e) => {
    setCommentDetails({
      ...commentDetails,
      name: account.username,
      postTitle: post.title,
      commentText: e.target.value,
    });
  };

  const addComment = async () => {
    try {
      const response = await fetch("http://localhost:5000/comment/create-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentDetails),
      });
      if (response.ok) {
        const newComment = { ...commentDetails };
        setComments([...comments, newComment]);
        setCommentDetails({ ...commentDetails, commentText: "" });
      }
    } catch (error) {
      console.error("ERROR WHILE ADDING COMMENT:", error);
    }
  };

  return (
    <Box sx={{ marginTop: "20px", padding: "10px", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
      {/* Comment Input Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Leave a Comment
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Avatar
          alt="User Avatar"
          src={placeholderImage}
          sx={{ width: 50, height: 50, bgcolor: "#1E88E5", color: "#fff" }}
        />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <TextareaAutosize
            minRows={3}
            placeholder="Write your comment here..."
            value={commentDetails.commentText}
            onChange={handleChange}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
              padding: "10px",
              fontSize: "1rem",
              fontFamily: "Roboto, sans-serif",
              resize: "none",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end", mt: 1 }}
            onClick={addComment}
            disabled={!commentDetails.commentText.trim()}
          >
            Post Comment
          </Button>
        </Box>
      </Box>

      {/* Comments Display Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {comments.length > 0 ? "All Comments" : "No Comments Yet"}
        </Typography>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <SingleComment comment={comment} key={index} />
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "#757575", textAlign: "center" }}>
            Be the first to leave a comment!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Comments;