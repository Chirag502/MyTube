import Video from ".././models/Video";
import routes from ".././routes";
import Comment from ".././models/Comment";

export const videoSearch = async (req, res) => {
  const { query } = req; // extracting search from url
  let videos = [];
  videos = await Video.find({ title: { $regex: query.term, $options: "i" } });
  // console.log(videos)
  res.render("search", { pageTitle: "Search", videos, searchingBy: query });
};
export const videoHome = async (req, res) => {
  const video = await Video.find().sort({ _id: -1 });
  res.render("home", { pageTitle: "Home", video });
};
export const videos = (req, res) => {
  res.render("videos", { pageTitle: "Videos" });
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // console.log( video.creator.toString()===req.user.id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title} `, video });
    }
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findByIdAndUpdate(
      id,
      {
        $set: { title: req.body.title, description: req.body.description },
      },
      { new: true }
    );
    // console.log(video);
    res.redirect(routes.videoDetails(video._id));
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      console.log("error since user is not creater of this video");
      throw Error();
    } else {
      await Video.findOneAndDelete(id);
    }
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(routes.home);
};

export const getUploadVideo = (req, res) => {
  res.render("uploadVideo", { pageTitle: "Upload" });
};

export const postUploadVideo = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  const newVideo = new Video({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  await newVideo.save();

  // regestering creator of video for => video edit and delete purposes
  req.user.videos.push(newVideo._id);
  await req.user.save();
  console.log(newVideo);
  res.redirect(routes.videoDetails(newVideo._id));
};
export const videoDetails = async (req, res) => {
  const {
    params: { id },
  } = req;
  // console.log(id);
  try {
    const videodetail = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    console.log(videodetail);
    res.render("videoDetails", { pageTitle: "Video Details", videodetail });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

//Register Video Views

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    // console.log(video)
    video.views += 1;
    await video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// registering the Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    // console.log("comment: ",comment);
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: req.user.id,
      video: id,
    });
    video.comments.push(newComment._id);
    await video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
