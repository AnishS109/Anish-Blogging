import mongoose from "mongoose"

const ConnectionDB = async() => {

  const URL = "mongodb+srv://root:root@lms.8dvli.mongodb.net/BLOG"

  try {

    await mongoose.connect(URL)
    console.log("MongoDB Connected");

  } catch (error) {

    console.log("Not Connected to database",error)
    
  }
}

export default ConnectionDB;

