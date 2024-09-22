import { NextFunction, Request, Response } from "express";
import Notification from "../models/notification.model";

const userNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ recipient: userId })
      .sort({
        createdAt: -1,
      })
      .populate("sender", "name username profilePic")
      .populate("post")
      .populate("comment");

    if (notifications.length === 0) {
      return res.status(404).json({ message: "Notifications not found" });
    }

    res.status(200).json({ notifications });
  } catch (err) {
    next(err);
  }
};

export { userNotification };
