import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model";
import Post from "../models/post.model";
import Notification from "../models/notification.model";

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

    // Step 3: Fetch the post and its author (recipient of the notification)
    const post = await Post.findById(postId).populate("author");

    // step 4: create a notification if the comment owner is not the post owner
    if (post?.author._id.toString() !== userId.toString()) {
      await Notification.create({
        type: "comment",
        recipient: post?.author._id,
        sender: userId,
        post: postId,
        comment: newComment._id,
      });
    }
    res.status(201).json({
      success: true,
      message: "Comment created and added to post successfully",
      comment: newComment,
    });
  } catch (err) {
    next(err);
  }
};

// get indivisual post comments
const getIndivisualPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId });

    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }

    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

// edite indivisual post comments
const editIndivisualPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (err) {
    next(err);
  }
};

// delete indivisual post comments
const deleteIndivisualPostComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export {
  createComment,
  getIndivisualPostComments,
  editIndivisualPostComments,
  deleteIndivisualPostComments,
};
