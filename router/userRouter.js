import express from 'express';
import routes from '../routes'
import { users, getEditProfile, changePassword, userDetails, postEditProfile } from '../controller/userController';
import { onlyPrivate, uploadAvatarMiddleware } from '../middleware';


const userRouter=express.Router();

// userRouter.get(routes.home,users)

userRouter.get(routes.editProfile,onlyPrivate,getEditProfile)
userRouter.post(routes.editProfile,onlyPrivate, uploadAvatarMiddleware,postEditProfile)
userRouter.get(routes.changePassword,onlyPrivate,changePassword)
userRouter.get(routes.userDetails(),userDetails)
export default userRouter;