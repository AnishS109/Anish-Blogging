import express from "express"
import cors from "cors"

import PostSchema from "../Model/PostSchema.js"

const DeletePost = express()

DeletePost.use(cors())
DeletePost.use(express.json())
DeletePost.use(express.urlencoded({extended:true}))

DeletePost.delete("/del/:title", async(req , res) => {
  const title = req.params.title  
  
  try {
    const deletePOST = await PostSchema.findOneAndDelete({title})
    return res.status(200).json({message:"Post deleted Succesfully"})
  } 
  catch (error) {
    console.log("ERROR WHILE DELETING",error)
    return res.status(500).json({message:"Post Not deleted"})
  }
})

export default DeletePost;