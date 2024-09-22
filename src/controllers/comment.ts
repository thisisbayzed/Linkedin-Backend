import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model";
import Post from "../models/post.model";

// Create a new comment
const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;

    // Step 1: Create the comment
    const newComment = await Comment.create({
      content,
      author: userId,
      post: postId,
    });

    // Step 2: Update the post with the new comment
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Comment created and added to post successfully",
      comment: newComment,
    });
  } catch (err) {
    next(err);
  }
};

// get all comments
const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { postId } = req.params;

    

  } catch (err) {
    next(err);
  }
};

export { createComment };
