import "@babel/polyfill";
import './db'
import app from "./app";

import model from "./models/User"
import Video from "./models/Video"
import Comment from "./models/Comment"



const PORT=process.env.PORT || 3000
app.listen(PORT,()=>console.log(`✅  Listening to http://localhost:${PORT} `));