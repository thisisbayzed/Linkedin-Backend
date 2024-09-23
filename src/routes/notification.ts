import express from "express";
import authHandler from "../middlewares/authHandler";
<<<<<<< HEAD
import { deleteNotification, markNotificationAsRead, userNotification } from "../controllers/notification";
const NotificationRouter = express.Router();

NotificationRouter.get("/", authHandler, userNotification);
NotificationRouter.put("/:id", authHandler , markNotificationAsRead)
NotificationRouter.delete("/:id", authHandler , deleteNotification)

export default NotificationRouter;
=======
import { userNotification } from "../controllers/notification";
const NotificationRouter = express.Router();

NotificationRouter.get("/", authHandler, userNotification);

export default NotificationRouter;
>>>>>>> f3c4a825c25b9eb72fefdfc5e554c31c7ad8aa3b
