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

// Vidoes
const VIDEOS='/videos';
const VIDEO_DETAILS='/:id';
const UPLOAD='/upload';
const EDIT_VIDEO='/:id/edit';
const DELETE_VIDEO='/:id/delete';

const routes={
     home:HOME,
     join:JOIN,
     login:LOGIN,
     logout:LOGOUT,
     search:SEARCH,
     users:USERS,
     userDetails:USER_DETAILS,
     editProfile:EDIT_PROFILE,
     changePassword:CHANGE_PASSWORD,
     videos:VIDEOS,
     videoDetails:VIDEO_DETAILS,
     upload:UPLOAD,
     editVideo:EDIT_VIDEO,
     deleteVideo:DELETE_VIDEO
}
export default routes;