import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";
import uploadToCloudinary from "../utils/uploadHandlers";
import ImagedeleteHandlers from "../utils/ImagedeleteHandlers";

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
    const Image = req.file?.buffer;

    let newPost;

    if (!title && !Image) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (Image) {
      const uploadResponse = await uploadToCloudinary(Image, "posts");
      newPost = new Post({
        title,
        image: uploadResponse.secure_url,
        author: req.user._id,
      });
    } else {
      newPost = new Post({
        title,
        author: req.user._id,
      });
    }

    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    next(err);
  }
};

// get single post
const singlePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId)
      .populate("author", "name username profilePic bio")
      .populate("comments");

    if (post?._id.toString() !== postId) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

// delete post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if the current user is the author of the post
    if (post.author.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // delete the image from cloudinary
    if (post.image) {
      await ImagedeleteHandlers(post.image);
    }

    // delete the post
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export { feedPost, createPost, singlePost, deletePost };
