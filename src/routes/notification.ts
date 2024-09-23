import express from "express";
import authHandler from "../middlewares/authHandler";
import { deleteNotification, markNotificationAsRead, userNotification } from "../controllers/notification";
const NotificationRouter = express.Router();

NotificationRouter.get("/", authHandler, userNotification);
NotificationRouter.put("/:id", authHandler , markNotificationAsRead)
NotificationRouter.delete("/:id", authHandler , deleteNotification)

export default NotificationRouter;