import { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { DataContext } from "../../Context/DataProvider";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Layout/Loader";
import Comments from "./Comments";

const DetailPost = () => {
  const { account, setUpdatePostTitle } = useContext(DataContext);

  const navigate = useNavigate()

  const [detailPost, setDetailPost] = useState(null);
  const [postMsg, setPostMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false); 

  const selected = useContext(DataContext).selected || localStorage.getItem("selectedPost");

  useEffect(() => {
    if (selected) {
      localStorage.setItem("selectedPost", selected); 
    } 
  }, [selected]);

  useEffect(() => {
    const fetchDetailPost = async () => {
      try {
        const response = await fetch(`https://anish-blogging.onrender.com/detail/post/${selected}`);
        const data = await response.json();

        if (response.ok) {
          setDetailPost(data);
        } else {
          console.log("Failed to fetch post details");
        }
      } catch (error) {
        console.log("ERROR IN DETAIL POST", error);
      }
    };

    fetchDetailPost();
  }, [selected]);

  const handleDelete = async (title) => {
    try {
      const response = await fetch(`https://anish-blogging.onrender.com/delete/del/${title}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setPostMsg("Post Successfully Deleted");
        setOpen(false); 
        setSuccessDialog(true); 

        setTimeout(() => {
          setSuccessDialog(false);
          navigate("/home")
        }, 1000);
      } 
    } catch (error) {
      console.log("ERROR IN DELETING", error);
      setPostMsg("An error occurred while deleting the post");
    }
  };

  return (
    <Layout>
      {detailPost ? (
        <div className="m-7 mt-3 border border-stone-300 rounded-lg pl-5 pr-5 pb-5 flex flex-col">
          <Typography sx={{ color: "#878787", mt: "5px" }}>{detailPost.categories}</Typography>

          <img
            src={detailPost.picture}
            className="border-b border-stone-300"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              borderRadius: "8px",
              paddingBottom: "30px",
            }}
          />

          {account.username === detailPost.username && (
            <Box sx={{ textAlign: "right" }}>
              <Link to={"/update"}>
              <ModeEditIcon
                sx={{
                  mx: "10px",
                  mt: "15px",
                  cursor: "pointer",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  fontSize: "30px",
                  p: "3px",
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
                  mt: "15px",
                  cursor: "pointer",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  fontSize: "30px",
                  p: "3px",
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
              fontSize: "28px",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {detailPost.title}
          </Typography>

          <Box sx={{ color: "#878787", mt: "30px" }}>
            <Typography>
              <span className="text-stone-700 font-bold">Created By: </span>
              {detailPost.username}
            </Typography>

            <Typography>
              <span className="text-stone-700 font-bold">Created On: </span>
              {new Date(detailPost.createdDate).toDateString()}
            </Typography>
          </Box>

          <Box sx={{ mt: "50px" }}>
            <Typography
              sx={{
                fontSize: "23px",
                fontFamily: "roboto",
              }}
            >
              {detailPost.description}
            </Typography>
          </Box>

          <Comments post={detailPost}/>

        </div>
      ) : (
        <div className="flex justify-center items-center w-[100%] mt-[30vh] mb-[30vh]">
          <Loader/>
        </div>
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
