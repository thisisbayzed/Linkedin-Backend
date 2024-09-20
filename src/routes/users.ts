import express from "express";
import authHandler from "../middlewares/authHandler";
import {
  currentUser,
  singleUser,
  suggestedUser,
  updateUser,
} from "../controllers/user";
import uploadImage from "../utils/multer";
const UsersRouter = express.Router();

UsersRouter.get("/currentUser", authHandler, currentUser);
UsersRouter.get("/suggestedUser", authHandler, suggestedUser);
UsersRouter.get("/:username", authHandler, singleUser);
UsersRouter.put(
  "/profile",
  uploadImage.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  authHandler,
  updateUser
);

export default UsersRouter;
