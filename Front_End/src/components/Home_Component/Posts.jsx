import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Loader from "../../Layout/Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(
          `https://anish-blogging-2.onrender.com/get/post/${
            category ? category : "All"
          }`
        );
        const data = await response.json();

        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {loading ? (
        // Show loader while posts are loading
        <div className="flex justify-center items-center w-[100%] h-[60vh]">
          <Loader />
        </div>
      ) : posts && posts.length > 0 ? (
        // Show posts if available
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <SinglePost post={post} />
          </Grid>
        ))
      ) : (
        // Show message if no posts are available
        <div className="flex justify-center items-center w-[100%]">
          <h1 className="text-2xl text-stone-500">No posts found</h1>
        </div>
      )}
    </>
  );
};

export default Posts;
