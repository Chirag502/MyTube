// Global
const HOME='/';
const JOIN='/join';
const LOGIN='/login';
const LOGOUT='/logout';
const SEARCH='/search';

// Users
const USERS='/users';
const USER_DETAILS='/:id';
const EDIT_PROFILE="/edit-profile";
const CHANGE_PASSWORD='/change-password';
const ME = '/me'

// Vidoes
const VIDEOS='/videos';
const UPLOAD='/upload';
const VIDEO_DETAILS='/:id';
const EDIT_VIDEO='/:id/edit';
const DELETE_VIDEO='/:id/delete';


// GITHUB

const GITHUB='/auth/github'
const GITHUB_CALLBACK='/auth/github/callback'

// FACEBOOK

const FB='/auth/facebook'
const FB_CALLBACK='/auth/facebook/callback'



const routes={
     home:HOME,
     join:JOIN,
     login:LOGIN,
     logout:LOGOUT,
     search:SEARCH,
     users:USERS,
     userDetails:(id)=>{
          if(id)
               return `/users/${id}`
          else
               return USER_DETAILS;
     },
     editProfile:EDIT_PROFILE,
     changePassword:CHANGE_PASSWORD,
     videos:VIDEOS,
     videoDetails:(id)=>{
          if(id)
               return `/videos/${id}`
          else
               return VIDEO_DETAILS;
     },
     uploadVideo:UPLOAD,
     editVideo:(id)=>{
          if(id)
               return `/videos/${id}/edit`
          else
               return EDIT_VIDEO;
     },
     deleteVideo:(id)=>{
          if(id)
               return `/videos/${id}/delete`
          else
              return DELETE_VIDEO;
     },
     me:ME,
     github:GITHUB,
     githubCallback:GITHUB_CALLBACK,
     fb:FB,
     fbCallback:FB_CALLBACK
}
export default routes;