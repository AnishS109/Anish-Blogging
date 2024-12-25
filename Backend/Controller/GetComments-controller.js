import express from "express"
import cors from "cors"

import CommentSchema from "../Model/CommentSchema.js"

const getComments = express()

getComments.use(cors())
getComments.use(express.json())
getComments.use(express.urlencoded({ extended:true }))

getComments.get("/comments/:title", async(req, res) => {

  const title = req.params.title  

  const postTitle = title

  try{
    const getAllComment = await CommentSchema.find({postTitle})

    if(title){
      return res.status(200).json(getAllComment)
    }
    return res.status(404).json({message:"POST TITLE IS NOT FOUND"})
  }
  catch(error){
    console.log("ERROR IN GET ALL COMMENTS", error)
    res.status(500).json({message:"ERROR IN GET ALL COMMENTS"})
  }

})

export default getComments;