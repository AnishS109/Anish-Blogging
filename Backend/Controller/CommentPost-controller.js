import express from "express"
import cors from "cors"

import CommentSchema from "../Model/CommentSchema.js"
import UserSchema from "../Model/UserSchema.js"

const CommentPost = express()

CommentPost.use(cors())
CommentPost.use(express.json())
CommentPost.use(express.urlencoded({extended:true}))

CommentPost.post("/create-comment", async(req , res) => {

  const {name } = req.body

  const username = name

  try {

    const existUser = await UserSchema.findOne({username})
    if(!existUser){
      return res.status(404).json({message:"Username not found, Login again to add comment"})
    }

    const comment = await new CommentSchema(req.body)
    comment.save()

    return res.status(200).json({message:"Comment is created succesfully"})
    
  } catch (error) {
    
    console.log("INTERNAL SERVER ERROR",error)
    return res.status(500).json({message:"INTERNAL SERVER ERROR"})
    
  }

})

export default CommentPost;