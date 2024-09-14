import express from "express";
import authHandler from "../middlewares/authHandler";
import { currentUser, singleUser, suggestedUser } from "../controllers/user";
const UsersRouter = express.Router();

UsersRouter.get("/currentUser", authHandler, currentUser);
UsersRouter.get("/suggestedUser", authHandler, suggestedUser);
UsersRouter.get("/:username", authHandler, singleUser);

export default UsersRouter;
