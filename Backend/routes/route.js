import express from "express";
import cors from "cors";
// import {UploadImage, getImage } from "../Controller/image-controller.js";
import {UploadImage, getImage} from "../Controller/image-controller.js"
import upload from "../utils/upload.js"; // multer middleware

const router = express.Router();

router.use(cors()); 

router.post("/file/upload", upload.single("file"), UploadImage);
router.get("/file/:filename", getImage)

export default router;