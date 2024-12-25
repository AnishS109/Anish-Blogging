import express from "express"
import cors from "cors"

import PostSchema from "../Model/PostSchema.js"
import UserSchema from "../Model/UserSchema.js"

const createPost = express()

createPost.use(cors())
createPost.use(express.json())
createPost.use(express.urlencoded({extended:true}))

createPost.post("/create", async(req, res) => {
  const {title, description, picture, username, category, createdDate} = req.body

  const usernameExist = UserSchema.find({username})
  if(!usernameExist){
    return res.status(404).json({message:"Login Again to create an post"})
  }

  // if(!picture){
  //   return res.status(400).json({message:"Select the picture and try again"})
  // }

  try {
    const newPost = new PostSchema({
      title,
      description,
      picture,
      username,
      categories:category,
      createdDate
    })

    await newPost.save()

    return res.status(200).json({message:"Post is successfully created"})
  } catch (error) {
    console.log("Error while posting",error)
    return res.status(500).json({message:"Error while posting"})
  }
})

export default createPost;