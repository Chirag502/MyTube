import express from "express";
import routes from "../routes";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  fbLogin,
  postFbLogin,
} from "../controller/userController";
import { videoSearch, videoHome } from "../controller/videoController";
import { onlyPublic, onlyPrivate } from "../middleware";
import passport from "passport";
import { postGithubLogin, getMe } from "../controller/userController";

const homeRouter = express.Router();

// Join
homeRouter.get(routes.join, onlyPublic, getJoin);
homeRouter.post(routes.join, onlyPublic, postJoin, postLogin);

//Login
homeRouter.get(routes.login, onlyPublic, getLogin);
homeRouter.post(routes.login, onlyPublic, postLogin);

//Others
homeRouter.get(routes.home, videoHome);
homeRouter.get(routes.search, videoSearch);
homeRouter.get(routes.logout, onlyPrivate, logout);

// Github

homeRouter.get(routes.github, githubLogin);
homeRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

// FACEBOOK

homeRouter.get(routes.fb, fbLogin);
homeRouter.get(
  routes.fbCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFbLogin
);

//logged user

homeRouter.get(routes.me, getMe);

export default homeRouter;
