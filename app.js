import express from 'express'
import cookiePrser from 'cookie-parser'
import chalk from 'chalk'
import morgan  from 'morgan'//middleware
import routes from './routes'
import home from './router/home';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
const app=express();

app.set("view engine","pug");
app.set('views','./views');
app.use(cookiePrser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
//  ROUTES
app.use(routes.home,home);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);

export default app;