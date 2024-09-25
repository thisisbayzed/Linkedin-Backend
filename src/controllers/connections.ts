import { NextFunction, Request, Response } from "express";
import Connection from "../models/connection.model";

const friendRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const { friendRequestId } = req.params;
    // const currentUser = req.user._id;

    // if (!friendRequestId) {
    //   return res.status(400).json({ message: "friendRequestId is required" });
    // }

    // if (friendRequestId.toString() === currentUser.toString()) {
    //   return res
    //     .status(400)
    //     .json({ message: "you can't send friend request to yourself" });
    // }

    // if (currentUser.connections.includes(friendRequestId)) {
    //   return res.status(400).json({ message: "You are already connected" });
    // }

    // const existingFriendRequest = await Connection.findOne({
    //   sender: currentUser,
    //   recipient: friendRequestId,
    // });

    // if (existingFriendRequest) {
    //   return res.status(400).json({ message: "Friend request already sent" });
    // }

    // const newFriendRequest = new Connection({
    //   sender: currentUser,
    //   recipient: friendRequestId,
    // });

    // await newFriendRequest.save();

    // res.status(201).json({ message: "Friend request sent successfully" });
    res.send("friend request sent successfully");
  } catch (err) {
    next(err);
  }
};

export { friendRequest };
