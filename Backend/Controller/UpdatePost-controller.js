import express from "express";
import cors from "cors";
import PostSchema from "../Model/PostSchema.js";

const UpdatePost = express();

UpdatePost.use(cors());
UpdatePost.use(express.json());
UpdatePost.use(express.urlencoded({ extended: true }));

UpdatePost.put("/update-post/:title", async (req, res) => {
  const { title } = req.params

  try {
    const POST = await PostSchema.findOne({ title });

    if (!POST) {
      return res.status(404).json({ message: "POST IS NOT FOUND" });
    }

    const updatedPost = await PostSchema.findOneAndUpdate(
      { title },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json({ message: "SUCCESSFULLY UPDATED"});
  } catch (error) {
    console.log("ERROR IN UPDATING", error);
    return res.status(500).json({ message: "ERROR IN UPDATING" });
  }
});

export default UpdatePost;
