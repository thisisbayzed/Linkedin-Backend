import express from "express";
import authHandler from "../middlewares/authHandler";
import { createComment } from "../controllers/comment";
const CommentRouter = express.Router();

CommentRouter.post("/:postId/create", authHandler, createComment);

export default CommentRouter;
