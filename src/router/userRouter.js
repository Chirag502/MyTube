import express from 'express';
import routes from '../routes'
import { users, getEditProfile, userDetails, postEditProfile, getChangePassword ,postChangePassword} from '../controller/userController';
import { onlyPrivate, uploadAvatarMiddleware } from '../middleware';
import { profileImage } from './../middleware';


const userRouter=express.Router();

// userRouter.get(routes.home,users)

userRouter.get(routes.editProfile,onlyPrivate,getEditProfile)
userRouter.post(routes.editProfile,onlyPrivate, uploadAvatarMiddleware,postEditProfile)

//change password
userRouter.get(routes.changePassword,onlyPrivate,getChangePassword)
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword)

userRouter.get(routes.userDetails(),userDetails)
userRouter.get(routes.profileImage,profileImage)
export default userRouter;