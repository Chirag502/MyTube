import mongoose from 'mongoose'

const videoSchema=new mongoose.Schema({
    fileUrl:{
        type:String,
        required:"Url is required"
    },
    title:{
        type:String,
        required:"Title is required"
    },
    description:String,
    views:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Video= mongoose.model("Video",videoSchema);
export default Video;