import mongoose from "mongoose";

const comments = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  postTitle:{
    type: String,
    required:true
  },
  date:{
    type: Date,
    required:true
  },
  commentText:{
    type: String,
    required:true
  }
})

const CommentSchema = mongoose.model("comments", comments)
export default CommentSchema;