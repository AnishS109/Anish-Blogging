import mongoose from "mongoose"

const ConnectionDB = async() => {

  const URL = "mongodb+srv://root:6TmgY4T39vnnMS6b@lms.8dvli.mongodb.net/BLOG?retryWrites=true&w=majority";

  try {

    await mongoose.connect(URL)
    console.log("MongoDB Connected");

  } catch (error) {

    console.log("Not Connected to database",error)
    
  }
}

export default ConnectionDB;

