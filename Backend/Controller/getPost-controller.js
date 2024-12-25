import express from "express"
import cors from "cors"

import PostSchema from "../Model/PostSchema.js"

const getPost = express()

getPost.use(cors())
getPost.use(express.json())
getPost.use(express.urlencoded({ extended:true }))

getPost.get("/post/:category", async(req, res) => {
  
  const category = req.params.category 

  try {

    if(category === "All"){
      const allPost = await PostSchema.find({})
      return res.status(200).json(allPost)
    }

    let selectedPost = await PostSchema.find({categories:category})
    if(!selectedPost){
      return res.status(404).json({message:"Post is not found"})
    }

    return res.status(200).json(selectedPost)
  } 

  catch (error) 
  {
    return res.status(500).json({message:"Internal Server Error"})
  }
})

export default getPost;