import express from 'express';
import routes from '../routes'

const homeRouter=express.Router();

homeRouter.get(routes.home,(req,res)=>res.render('home'));
homeRouter.get(routes.join,(req,res)=>res.send('join'));
homeRouter.get(routes.search,(req,res)=>res.send('search'));
homeRouter.get(routes.login,(req,res)=>res.send('login'));
homeRouter.get(routes.logout,(req,res)=>res.send('logout'));


export default homeRouter;