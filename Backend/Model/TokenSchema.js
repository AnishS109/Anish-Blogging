import mongoose from "mongoose";

const token = new mongoose.Schema({
  token:{
    type: String,
    required: true
  }
})

const TokenSchema = mongoose.model("token",token)
export default TokenSchema