import express from 'express';
import routes from '../routes'


const userRouter=express.Router();

userRouter.get(routes.home,(req,res)=>res.send('user'));
userRouter.get(routes.editProfile,(req,res)=>res.send('edit profile'));
userRouter.get(routes.changePassword,(req,res)=>res.send('change password'));
userRouter.get(routes.userDetails,(req,res)=>res.send('user details'));

export default userRouter;