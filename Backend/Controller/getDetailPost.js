import express from "express"
import cors from "cors"

import PostSchema from "../Model/PostSchema.js"

const getDetailPost = express()

getDetailPost.use(cors())
getDetailPost.use(express.json())
getDetailPost.use(express.urlencoded({ extended:true }))

getDetailPost.get("/post/:title", async(req, res) => {

  const title = req.params.title  

  try{
    const detailPOST = await PostSchema.findOne({title})

    if(title){
      res.status(200).json(detailPOST)
    }
  }
  catch(error){
    console.log("ERROR IN DETAIL POST", error)
    res.status(500).json({message:"ERROR IN DETAIL POST"})
  }

})

export default getDetailPost;