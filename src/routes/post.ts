import express from "express";
import authHandler from "../middlewares/authHandler";
import { feedPost } from "../controllers/post";
const PostRouter = express.Router();

PostRouter.get("/all" , authHandler , feedPost )
PostRouter.post("/create" , authHandler)

export default PostRouter;
