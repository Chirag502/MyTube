import routes from './routes'
import multer from 'multer'

// uploading video to DB 

const uploadVideo = multer({ dest: 'uploads/videos/' });
const uploadAvatar= multer({dest: 'uploads/avatar'})

// adding locals for access by view engine

export const localsMiddleware=(req,res,next)=>{
    res.locals.siteName="MyTube";
    res.locals.routes=routes;
    res.locals.loggedUser=req.user || null;//becoz of passport serialize in passport.js
    // console.log(req.user)
    next();
}

// applying to routes that is available to non-logged in users only
export const onlyPublic=(req,res,next)=>{
    if(req.user)
        res.redirect(routes.home);
    else
        next();
}

// securing routes for only logged in user
export const onlyPrivate=(req,res,next)=>{
    if(req.user)
        next();
    else
        res.redirect(routes.home);
}
export const uploadAvatarMiddleware=uploadAvatar.single('avatar') 
export const uploadVideoMiddleware=uploadVideo.single('videoFile') 
// 'videoFile' comes from uploadVideo.pug's input box of video 