import routes from "../routes";
import User from "../models/User";
import passport from "passport";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    req.flash("error", "Passwords do not match");
    res.status(401);
    return res.render("join", { title: "Join" });
  }

  // registering/creating  the user
  try {
    await User.register(await User({ name, email }), password); // function of 'passport-local-mongoose'
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't login. Please check email and/or password !",
});
export const logout = (req, res) => {
  req.logout(); // passport magic
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");

    res.render("userDetails", { pageTitle: "User Details", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// GITHUB AUTH

export const githubLogin = passport.authenticate("github", {}); //from passportjs.org github login page

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //---------  to check info recieved from github -------
  console.log(profile);

  const {
    _json: { id, avatar_url, email },
    username,
  } = profile;
  try {
    const user = await User.findOne({ email });

    if (user) {
      user.githubId = id;
      await user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name: username,
      email,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  req.flash("success", "Welcome!");
  res.redirect(routes.home);
};

// FB AUTH

export const fbLogin = passport.authenticate("facebook"); //from passportjs.org fb login page

export const fbLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  //---------  to check info recieved from fb -------
  console.log(accessToken, refreshToken, profile, cb);

  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });

    if (user) {
      user.facebookId = id;
      await user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      facebookId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFbLogin = (req, res) => res.redirect(routes.home);

export const users = (req, res) => res.render("user", { pageTitle: "User" });

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  // console.log(req.file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Profile updated!");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't edit profile");
    res.redirect(routes.editProfile);
  }
};

//change password

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const { currentPassword, newPassword, verifyPassword } = req.body;
  try {
    if (newPassword !== verifyPassword) {
      res.status(400);
      req.flash("error", "Make sure the verification password matches");
      res.redirect(routes.changePassword);
    } else {
      await req.user.changePassword(currentPassword, newPassword);
      req.flash("success", "Password Updated!");
      res.redirect(routes.me);
    }
  } catch (error) {
    res.status(400);
    req.flash("error", "Can't update password");
    res.redirect(routes.changePassword);
  }
};

export const userDetails = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    // console.log( typeof 1)
    res.render("userDetails", { pageTitle: "User Details", user });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};
