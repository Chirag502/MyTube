import Video from '../models/Video'
import routes from '../routes'

export const videoSearch=async(req,res)=>{  
    const {query}=req
    // console.log(query)
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
        console.log(video)
        res.render('editVideo',{pageTitle:`Edit ${video.title} `,video})
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
        console.log(id);
    const videodetail= await Video.findByIdAndDelete(id);
    console.log(videodetail)
    res.render('deleteVideo');
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
    const video=new Video({
        fileUrl:path,
        title,
        description
    })
    await video.save();
    console.log(video);
    res.redirect(routes.videoDetails(video._id));
}
export const videoDetails= async (req,res)=>{ 
    const { 
        params:{id}
    }=req;
    try{
    const videodetail= await Video.findById(id);
    console.log(videodetail)
    res.render('videoDetails',{pageTitle:"Video Details",videodetail})
    }
    catch(err)
    {
        console.log(err);
        res.redirect(routes.home);
    }


}