import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";
import Notification from "../models/notification.model";

const userLikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id.toString(); // Ensure userId is a string
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already liked the post
    if (post.likes.some((like) => like.toString() === userId)) {
      // Unlike the post
      post.likes = post.likes.filter((like) => like.toString() !== userId);
    } else {
      // Like the post
      post.likes.push(userId);

      // Send notification to post author if the author isn't the one liking the post
      if (post.author.toString() !== userId) {
        const notification = new Notification({
          type: "like",
          recipient: post.author,
          sender: userId,
          post: postId,
        });
        await notification.save();
      }
    }

    // Save the updated post
    await post.save();

    // Respond with the updated post
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

export default userLikes;
