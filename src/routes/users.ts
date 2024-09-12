import express from "express";
import authHandler from "../middlewares/authHandler";
import { currentUser } from "../controllers/user";
const UsersRouter = express.Router();


UsersRouter.get("/currentUser" , authHandler , currentUser )


export default UsersRouter