

// import { GridFsStorage } from "multer-gridfs-storage";
// import multer from "multer";

// const storage = new GridFsStorage({
//   url: "mongodb+srv://root:root@lms.8dvli.mongodb.net/BLOG",
//   file: (req, file) => {
//     // console.log("File Info:", file);  

//     const match = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    
//     if (match.indexOf(file.mimetype) === -1) {
//       console.error("Invalid file type:", file.mimetype);
//       return `${file.originalname}`;
//     }

//     return {
//       bucketName: "photos",
//       filename: `${file.originalname}`,
//     };
//   },
// });

// export default multer({ storage });

import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

// Create the GridFsStorage instance
const storage = new GridFsStorage({
  url: "mongodb+srv://root:6TmgY4T39vnnMS6b@lms.8dvli.mongodb.net/BLOG?retryWrites=true&w=majority", // Use environment variables for security
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (match.indexOf(file.mimetype) === -1) {
      console.error("Invalid file type:", file.mimetype);
      return null; // Reject files with invalid types
    }

    return {
      bucketName: "photos", // Specify the bucket name
      filename: `${Date.now()}-${file.originalname}`, // Unique filename to prevent overwrites
    };
  },
});

// Handle connection errors
storage.on("connection", (db) => {
  console.log("Successfully connected to MongoDB for file storage!");
});

storage.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

export default multer({ storage });
