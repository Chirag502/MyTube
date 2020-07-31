import express from 'express'
import cookiePrser from 'cookie-parser'
import path from 'path'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose  from 'mongoose';
import morgan  from 'morgan'    //middleware
import passport  from 'passport'    //middleware
import routes from './routes'
import home from './router/homeRouter';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
import { localsMiddleware,uploadVideoMiddleware } from './middleware'

import './passport';


const app=express();

const CookieStore=MongoStore(session)



app.set("view engine","pug");
app.set('views','./views');
app.use('/uploads',express.static("uploads"))
app.use('/static',express.static(path.join(__dirname, "static")))

// MIDDLEWARE
app.use(cookiePrser())
app.use(express.json())// for json parsing at server
app.use(express.urlencoded({extended:true}))//for html forms parsing at server 
app.use(morgan("dev"))
app.use(
    session({
    secret:process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:false,
    store:new CookieStore({mongooseConnection:mongoose.connection})
    })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(localsMiddleware)

//  ROUTES
app.use(routes.home,home);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;