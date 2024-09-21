import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";

// get feed posts
const feedPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      author: { $in: [...req.user.connections, req.user._id] },
    })
      .populate("author", "name username profilePic bio")
      .populate("comments")
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

// create new post
const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const Image = req.file;

    let newPost;

  } catch (err) {
    next(err);
  }
};
export { feedPost, createPost };
