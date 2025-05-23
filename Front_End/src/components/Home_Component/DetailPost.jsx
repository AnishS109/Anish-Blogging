import { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { DataContext } from "../../Context/DataProvider";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography, CircularProgress } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader";
import Comments from "./Comments";

const DetailPost = () => {
  const { account, setUpdatePostTitle } = useContext(DataContext);
  const navigate = useNavigate();

  const [detailPost, setDetailPost] = useState(null);
  const [postMsg, setPostMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [imageLoading, setImageLoading] = useState(true); // Added state for image loading
  const [loading, setLoading] = useState(true); // Added loading state for post fetch

  const selected = useContext(DataContext).selected || localStorage.getItem("selectedPost");

  const backendURL = "http://localhost:5001";

  // Calculate the image URL
  const picturePath = detailPost?.picture ? detailPost.picture.split("/file/")[1] : null;
  const urll = picturePath
    ? `${backendURL}/file/${picturePath}`
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    if (selected) {
      localStorage.setItem("selectedPost", selected);
    }
  }, [selected]);

  useEffect(() => {
    const fetchDetailPost = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await fetch(`${backendURL}/detail/post/${selected}`);
        const data = await response.json();

        if (response.ok) {
          setDetailPost(data);
        } else {
          console.log("Failed to fetch post details");
        }
      } catch (error) {
        console.log("ERROR IN DETAIL POST", error);
      } finally {
        setLoading(false); // Set loading to false after fetching the data
      }
    };

    fetchDetailPost();
  }, [selected]);

  const handleDelete = async (title) => {
    try {
      const response = await fetch(`${backendURL}/delete/del/${title}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setPostMsg("Post Successfully Deleted");
        setOpen(false);
        setSuccessDialog(true);

        setTimeout(() => {
          setSuccessDialog(false);
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.log("ERROR IN DELETING", error);
      setPostMsg("An error occurred while deleting the post");
    }
  };

  return (
    <Layout>
      {loading ? (
        // Show loader while fetching post details
        <Box
          className="flex justify-center items-center"
          sx={{
            width: "100%",
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        // Show post details once data is fetched
        <Box
          className="m-7 mt-3 border border-stone-300 rounded-lg pl-5 pr-5 pb-5 flex flex-col"
          sx={{
            margin: "1vw auto",
            padding: { xs: "2vw", sm: "3vw", md: "4vw" },
            borderRadius: "8px",
            maxWidth: "1540px",
          }}
        >
          <Typography
            sx={{
              color: "#878787",
              marginTop: "5px",
              fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
              textAlign: "left",
            }}
          >
            {detailPost.categories}
          </Typography>

          {/* Image with loading spinner */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxHeight: "500px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageLoading && <CircularProgress />} {/* Loading indicator */}
            <img
              src={urll}
              alt="Post"
              onLoad={() => setImageLoading(false)} // Hide spinner once loaded
              onError={() => setImageLoading(false)} // Hide spinner on error
              className="border-b border-stone-300"
              style={{
                width: "100%",
                height: "100%",
                maxHeight:"500px",
                objectFit: "contain",
                borderRadius: "8px",
                display: imageLoading ? "none" : "block", // Hide image while loading
              }}
            />
          </Box>

          {account.username === detailPost.username && (
            <Box sx={{ textAlign: "right", marginBottom: "15px" }}>
              <Link to={"/update"}>
                <ModeEditIcon
                  sx={{
                    mx: "10px",
                    cursor: "pointer",
                    border: "1px solid gray",
                    borderRadius: "5px",
                    fontSize: "30px",
                    padding: "3px",
                    "&:hover": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                  onClick={() => setUpdatePostTitle(detailPost.title)}
                />
              </Link>

              <DeleteIcon
                sx={{
                  mx: "10px",
                  cursor: "pointer",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  fontSize: "30px",
                  padding: "3px",
                  "&:hover": {
                    bgcolor: "black",
                    color: "white",
                  },
                }}
                onClick={() => setOpen(true)}
              />
            </Box>
          )}

          <Typography
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {detailPost.title}
          </Typography>

          <Box sx={{ color: "#878787", marginTop: "30px" }}>
            <Typography>
              <span className="text-stone-700 font-bold">Created By: </span>
              {detailPost.username}
            </Typography>

            <Typography>
              <span className="text-stone-700 font-bold">Created On: </span>
              {new Date(detailPost.createdDate).toDateString()}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "50px" }}>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                fontFamily: "roboto",
              }}
            >
              {detailPost.description}
            </Typography>
          </Box>

          <Comments post={detailPost} />
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>Are you sure you want to delete this post?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              handleDelete(detailPost.title);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successDialog}>
        <DialogContent sx={{ color: "green", textAlign: "center" }}>
          Post Deleted Successfully
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DetailPost;
