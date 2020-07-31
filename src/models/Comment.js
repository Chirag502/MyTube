import mongoose from 'mongoose'

const commentSchema=new mongoose.Schema({
    text:{
        type:String,
        required:"Text is required"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Comment= mongoose.model("Comment",commentSchema);
export default Comment;