import mongoose from "mongoose";

const post = new mongoose.Schema({
  title:{
    type:String,
    unique:true
  },
  description:{
    type:String,
  },
  picture:{
    type:String,
  },
  username:{
    type:String,
  },
  categories:{
    type:String,
    required:true,
  },
  createdDate:{
    type:String,
  },
})

const PostSchema = mongoose.model("post",post)
export default PostSchema