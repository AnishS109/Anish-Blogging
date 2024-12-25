import express from "express"
import ConnectionDB from "./database/database.js"

import router from "./routes/route.js"

import SignInUser from "./Controller/user-sign-in-controller.js"
import SignUpUser from "./Controller/user-signup-controller.js"
import createPost from "./Controller/createPost-controller.js"
import getPost from "./Controller/getPost-controller.js"
import getDetailPost from "./Controller/getDetailPost.js"
import DeletePost from "./Controller/DeletedPost-controller.js"
import UpdatePost from "./Controller/UpdatePost-controller.js"
import CommentPost from "./Controller/CommentPost-controller.js"
import getComments from "./Controller/GetComments-controller.js"
import delComments from "./Controller/deleteComment-controller.js"
import path from "path"
import { fileURLToPath } from 'url';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/",router)
app.use("/login",SignInUser)
app.use("/register",SignUpUser)
app.use("/post", createPost)
app.use("/get", getPost)
app.use("/detail", getDetailPost)
app.use("/delete", DeletePost)
app.use("/update", UpdatePost)
app.use("/comment", CommentPost)
app.use("/get", getComments)
app.use("/delete-com", delComments)

app.use(express.static(path.join(__dirname, '../Front_End/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Front_End/dist', 'index.html'));
});
const PORT = 5000
app.listen(PORT,() => {
console.log(`http://localhost:${PORT}`);
})

ConnectionDB()