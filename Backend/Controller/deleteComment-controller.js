import express from "express"
import cors from "cors"

import CommentSchema from "../Model/CommentSchema.js"

const delComments = express()

delComments.use(cors())
delComments.use(express.json())
delComments.use(express.urlencoded({extended:true}))

delComments.delete("/del/:title", async(req , res) => {
  const title = req.params.title  

  const postTitle = title
  
  try {
    const deleteCOMM = await CommentSchema.findOneAndDelete({postTitle})
    return res.status(200).json({message:"Post deleted Succesfully"})
  } 
  catch (error) {
    console.log("ERROR WHILE DELETING",error)
    return res.status(500).json({message:"Post Not deleted"})
  }
})

export default delComments;