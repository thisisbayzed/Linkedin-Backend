import { NextFunction, Request, Response } from "express";
import Notification from "../models/notification.model";

// get the notification
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

// mark notification as read
const markNotificationAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndUpdate(
      {_id:notificationId , recipient:req.user._id},
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ notification });
  } catch (err) {
    next(err);
  }
};

// delete notification
const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findByIdAndDelete({
      _id: notificationId,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    next(err);
  }
};




export { userNotification , markNotificationAsRead , deleteNotification };

