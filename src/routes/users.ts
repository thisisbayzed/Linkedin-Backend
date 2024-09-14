import express from "express";
import authHandler from "../middlewares/authHandler";
import {
  currentUser,
  singleUser,
  suggestedUser,
  updateUser,
} from "../controllers/user";
const UsersRouter = express.Router();

UsersRouter.get("/currentUser", authHandler, currentUser);
UsersRouter.get("/suggestedUser", authHandler, suggestedUser);
UsersRouter.get("/:username", authHandler, singleUser);
UsersRouter.put("/profile", authHandler, updateUser);

export default UsersRouter;
