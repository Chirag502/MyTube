import routes from "./routes";
import multer from "multer";
import { conn } from "./db";
import mongoose from "mongoose";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
// const GridFsStorage = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const methodOverride = require("method-override");


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  sessionToken:process.env.AWS_SESSION_TOKEN
});
const uploadVideo = multer({
  storage: multerS3({
    s3,
    acl:"public-read",
    bucket: "mytube1/video",
  }),
});

const uploadAvatar =multer({
  storage: multerS3({
    s3,
    acl:"public-read",
    bucket: "mytube1/avatar",
  }),
});


// adding locals for access by view engine

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "MyTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //becoz of passport serialize in passport.js
  // console.log(req.user)
  next();
};

// applying to routes that is available to non-logged in users only
export const onlyPublic = (req, res, next) => {
  if (req.user) res.redirect(routes.home);
  else next();
};

// securing routes for only logged in user
export const onlyPrivate = (req, res, next) => {
  if (req.user) next();
  else res.redirect(routes.home);
};

export const uploadAvatarMiddleware = uploadAvatar.single("avatar");
export const uploadVideoMiddleware = uploadVideo.single("videoFile");
// 'videoFile' comes from uploadVideo.pug's input box of video


// uploading video to DB

// const uploadVideo = multer({ dest: "uploads/videos/" }); // FOR STORAGE ON PC

// var gfs;

// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection(`avatar`);
// });
// // console.log(mongoose.mongo);

// const storage = new GridFsStorage({
//   url: conn.client.s.url,
//   file: (req, file) => {
//     console.log(file);
//     return {
//       bucketName: "avatar",
//       filename: file.originalname,
//     };
//   },
// });

// const uploadAvatar = multer({ storage });

// export const profileImage = (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: "No file exists",
//       });
//     }
    
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// };
