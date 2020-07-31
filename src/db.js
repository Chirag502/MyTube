import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.PRODUCTION ? process.env.MONGO_URL_PROD: process.env.MONGO_URL,{
    useFindAndModify:false,
 useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("✅ connnected to database "))
    .catch(()=>console.log( " 😖 failed to connect to db"));
  
