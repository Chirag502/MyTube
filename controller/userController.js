import routes from "../routes";
import User from '../models/User'
import passport from "passport";
export const getJoin=(req,res)=>{
    res.render("join",{pageTitle:"Join"})
}

export const postJoin=async(req,res,next)=>{
    const {name,email,password,confirm_password}=req.body;
    if(password!==confirm_password)
      return   res.status(400).send("Verify password again")
    
    // registering/creating  the user
      try{
          await User.register(await User({name,email}),password);// function of 'passport-local-mongoose'
          next()
      }
      catch(error)
      {
        console.log(error);
        res.redirect(routes.home);
      }    
}



export const getLogin =(req,res)=>res.render("login",{pageTitle:"Login"})

export const postLogin=passport.authenticate('local',{
  failureRedirect: routes.login,
  successRedirect:routes.home
})
export const logout=(req,res)=>{
  req.logout(); // passport magic
  res.redirect(routes.home);
}

export const getMe=(req,res)=>{
  console.log(req.user)
  res.render('userDetails',{pageTitle:"User Details",user : req.user});
}

// GITHUB AUTH

export const githubLogin = passport.authenticate('github'); //from passportjs.org github login page

export const githubLoginCallback=async(accessToken, refreshToken, profile, cb)=>{
  
  //---------  to check info recieved from github -------
  console.log(profile)  
  
  const {_json:{id,avatar_url,email},username }=profile;
  try {
    const user= await User.findOne({email})
    
    if(user)
    {
      user.githubId=id;
      await user.save()
      return cb(null,user);
    }
      const newUser = await User.create({
        name:username,
        email,
        githubId:id,
        avatarUrl:avatar_url
      })
      return cb(null,newUser);
    
  } catch (error) {
    return  cb(error)
    
  }
}

export const postGithubLogin=(req,res) => res.redirect(routes.home)



// FB AUTH


export const fbLogin = passport.authenticate('facebook'); //from passportjs.org fb login page

export const fbLoginCallback=async(accessToken, refreshToken, profile, cb)=>{
  
  //---------  to check info recieved from fb -------
  console.log(accessToken, refreshToken, profile, cb)  
  
  const {_json:{id,avatar_url,name,email} }=profile;
  try {
    const user= await User.findOne({email})
    
    if(user)
    {
      user.facebookId=id;
      await user.save()
      return cb(null,user);
    }
      const newUser = await User.create({
        name,email,
        facebookId:id,
        avatarUrl:avatar_url
      })
      return cb(null,newUser);
    
  } catch (error) {
    return  cb(error)
    
  }
}

export const postFbLogin=(req,res) => res.redirect(routes.home)



export const users=(req,res)=>res.render('user',{pageTitle:"User"});

export const getEditProfile=(req,res)=>res.render('editProfile',{pageTitle:"Edit Profile"});

export const postEditProfile=async(req,res)=>{
  const { 
    body:{ name,email},
    file
  }=req;
  try {
    await User.findByIdAndUpdate(req.user.id,{
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    })
    res.redirect(routes.me)

  } catch (error) {
    res.render(routes.editProfile,{ pageTitle:"Edit Profile"})
    
  }

}

export const changePassword=(req,res)=>res.render('changePassword',{pageTitle:"Change Password"});


export const userDetails=async(req,res)=> {
  const{ params:{ id } }=req
  try {
    const user= await User.findById(id)
    res.render('userDetails',{pageTitle:"User Details",user});
  } catch (error) {
    res.redirect(routes.home);
  }
  
}

