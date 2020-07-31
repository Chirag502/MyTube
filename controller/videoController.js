import Video from '../models/Video'
import routes from '../routes'
import { NoEmitOnErrorsPlugin } from 'webpack'

export const videoSearch=async(req,res)=>{  
    const {query}=req // extracting search from url
    let videos=[]
    videos=await Video.find({title:{$regex:query.term , $options:'i'}});
    console.log(videos)
    res.render('search',{pageTitle:"Search", videos,searchingBy:query})
}
export const videoHome=async(req,res)=>{
    const video=await Video.find().sort({_id:-1});
    res.render('home',{pageTitle:"Home",video})
}
export const videos=(req,res)=>{   
    res.render('videos',{pageTitle:"Videos"})
}
export const getEditVideo=async (req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const video=await Video.findById(id);
        console.log( video.creator.toString()===req.user.id);
        if(video.creator.toString()!==req.user.id)
        {
            throw Error();
            return;
        }
        else{
            res.render('editVideo',{pageTitle:`Edit ${video.title} `,video})
        }
    }
    catch(err){

        res.redirect(routes.home)
    }
}
export const postEditVideo=async(req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const video=await Video.findByIdAndUpdate(id,{
            $set:{title:req.body.title,description:req.body.description}
        },{new:true});
        console.log(video);
        res.redirect(routes.videoDetails(video._id))
    }
    catch(err){

        res.redirect(routes.home);
    }
}
export const deleteVideo= async(req,res)=>{  
    const { 
        params:{id}
    }=req;
    try{
        const video=await Video.findById(id);
        if(video.creator!==req.user.id)
        {
            throw Error();
            return;
        }
        else{
            await Video.findOneAndDelete(id);
            res.render('deleteVideo');
        }
    }
    catch(err)
    {
        console.log(err.message);
        res.redirect(routes.home);
    }
   
}
export const getUploadVideo=(req,res)=>{   
    res.render('uploadVideo',{pageTitle:"Upload"})
    }

export const postUploadVideo= async (req,res)=>{
    const{
        body:{title,description},
        file:{path}
    }=req;
    console.log("hello :",path)
    const newVideo=new Video({
        fileUrl:path,
        title,
        description,
        creator:req.user.id
    })
    await newVideo.save();

    // regestering creator of video for => video edit and delete purposes
    req.user.videos.push(newVideo._id);
    await req.user.save();
    console.log(newVideo);
    res.redirect(routes.videoDetails(newVideo._id));
}
export const videoDetails= async (req,res)=>{ 
    const { 
        params:{id}
    }=req;
    // console.log(id);
    try{
    const videodetail= await Video.findById(id).populate("creator");
    console.log(videodetail)
    res.render('videoDetails',{pageTitle:"Video Details",videodetail})
    }
    catch(err)
    {
        console.log(err);
        res.redirect(routes.home);
    }


}