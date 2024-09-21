import express from "express";
import authHandler from "../middlewares/authHandler";
import {
  createPost,
  deletePost,
  feedPost,
  singlePost,
} from "../controllers/post";
import uploadImage from "../utils/multer";
const PostRouter = express.Router();

PostRouter.get("/all", authHandler, feedPost);
PostRouter.post(
  "/create",
  uploadImage.single("image"),
  authHandler,
  createPost
);
PostRouter.get("/:postId", authHandler, singlePost);

PostRouter.delete("/:postId", authHandler, deletePost);

export default PostRouter;
