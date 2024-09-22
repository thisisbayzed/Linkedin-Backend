import express from "express";
import authHandler from "../middlewares/authHandler";
import { userNotification } from "../controllers/notification";
const NotificationRouter = express.Router();

NotificationRouter.get("/", authHandler, userNotification);

export default NotificationRouter;
