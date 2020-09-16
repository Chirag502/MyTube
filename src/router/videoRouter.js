import express from "express";
import routes from "../routes";
import { uploadVideoMiddleware, onlyPrivate } from "../middleware";
import {
  videos,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  getUploadVideo,
  postUploadVideo,
  videoDetails,
} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.home, videos);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.uploadVideo, onlyPrivate, getUploadVideo);
videoRouter.post(
  routes.uploadVideo,
  onlyPrivate,
  uploadVideoMiddleware,
  postUploadVideo
);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
videoRouter.get(routes.videoDetails(), videoDetails);

export default videoRouter;
