import UserSchema from "../Model/UserSchema.js"
import TokenSchema from "../Model/TokenSchema.js"

import  express  from "express"
import cors from "cors"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const SignInUser  = express()

SignInUser.use(cors()); // to allow cross-origin requests
SignInUser.use(express.json()); // to parse JSON bodies
SignInUser.use(express.urlencoded({ extended: true }));

SignInUser.post("/user-login", async(req,res) => {

  const {username,password} = req.body
  const ACCESS_SECRET_KEY = "hsdgcugchdgsbxcjgsxhslmkhxbnsggxnkgfkjwegzlkjwghdjhxgxjkg"
  const REFRESH_SECRET_KEY = "sxsjdiehiossienxutfbeisuzncuitbexnkjshzkdhbxjvhrdxnhsgdg"

  try {

    const user = await UserSchema.findOne({username})

    if(!user){
      return res.status(400).json({message: "Username is not Found"})
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(matchPassword){

      const accessToken = jwt.sign(user.toJSON() , ACCESS_SECRET_KEY , {expiresIn:"15m"})
      const refreshToken = jwt.sign(user.toJSON() , REFRESH_SECRET_KEY)

      const newToken = await TokenSchema({ token:refreshToken })
      await newToken.save();

      return res.status(200).json({accessToken, refreshToken, name: user.name, username})

    }
    else{
      return res.status(400).json({message:"Password is Incorrect"})
    }
    
  } catch (error) {
    console.error("ERROR OCCURED IN LOGIN")
    res.status(500).json({message:"SOMETHING WENT WRONG"})
  }
}) 

export default SignInUser