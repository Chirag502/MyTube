import passport from 'passport';
import User from './models/User';
import routes from "./routes"
import GithubStrategy from 'passport-github'
import FacebookStrategy from 'passport-facebook'
import { githubLoginCallback,fbLoginCallback } from './controller/userController';

//strategies for login

passport.use(User.createStrategy());

passport.use( new GithubStrategy({
        clientID:process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:3000${routes.githubCallback}`
},githubLoginCallback))


passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://localhost:3000${routes.fbCallback}`
  },fbLoginCallback))








// Sessions

//     In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

//     Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.


//     Only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.

//     The serialization and deserialization logic is supplied by the application, allowing the application to choose an appropriate database and/or object mapper, without imposition by the authentication layer.



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });