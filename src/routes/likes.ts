import express from "express";
import authHandler from "../middlewares/authHandler";
import userLikes from "../controllers/likes";
const likesRouter = express.Router();

likesRouter.post("/:postId", authHandler, userLikes);

export default likesRouter;
