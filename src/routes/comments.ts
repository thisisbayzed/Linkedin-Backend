import express from "express";
import authHandler from "../middlewares/authHandler";
import {
  createComment,
  deleteIndivisualPostComments,
  editIndivisualPostComments,
  getIndivisualPostComments,
} from "../controllers/comment";
const CommentRouter = express.Router();

CommentRouter.post("/:postId/create", authHandler, createComment);
CommentRouter.get("/:postId", authHandler, getIndivisualPostComments);
CommentRouter.put("/:commentId/edit", authHandler, editIndivisualPostComments);
CommentRouter.delete("/:commentId", authHandler, deleteIndivisualPostComments);

export default CommentRouter;
