import express from 'express';
import routes from '../routes'

const videoRouter=express.Router();

videoRouter.get(routes.home,(req,res)=>res.send('videos'));
videoRouter.get(routes.editVideo,(req,res)=>res.send('edit video'));
videoRouter.get(routes.deleteVideo,(req,res)=>res.send('delete video'));
videoRouter.get(routes.upload,(req,res)=>res.send('upload video'));
videoRouter.get(routes.videoDetails,(req,res)=>res.send('video details'));

export default videoRouter;