import { NextFunction, Request, Response } from "express";
import Connection from "../models/connection.model";
import User from "../models/user.model";
import Notification from "../models/notification.model";

// send friend request
const friendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { friendRequestId } = req.params;
    const currentUser = req.user;

    // console.log(friendRequestId, currentUser);

    if (!friendRequestId) {
      return res.status(400).json({ message: "friendRequestId is required" });
    }

    if (friendRequestId.toString() === currentUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "you can't send friend request to yourself" });
    }

    if (currentUser.connections.includes(friendRequestId)) {
      return res.status(400).json({ message: "You are already connected" });
    }

    const existingFriendRequest = await Connection.findOne({
      sender: currentUser._id,
      recipient: friendRequestId,
    });

    if (existingFriendRequest) {
      await Connection.findByIdAndDelete(existingFriendRequest._id);
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const newFriendRequest = new Connection({
      sender: currentUser._id,
      recipient: friendRequestId,
    });

    await newFriendRequest.save();

    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (err) {
    next(err);
  }
};

// accept friend request
const acceptRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { connectionId } = req.params;
    const currentUser = req.user;

    console.log(connectionId);

    if (!connectionId) {
      return res.status(400).json({ message: "connectionId is required" });
    }

    const connection = await Connection.findById(connectionId)
      .populate("sender", "name email username profilePic")
      .populate("recipient", "name email username profilePic");

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    // we are not acceted others friend request
    if (connection.recipient._id.toString() !== currentUser._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to accept this request" });
    }

    if (connection.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    connection.status = "accepted";
    await connection.save();

    // if im your friend then ur also my friend ;)

    await User.findByIdAndUpdate(currentUser._id, {
      $addToSet: { connections: connection.sender._id },
    });
    await User.findByIdAndUpdate(connection.sender._id, {
      $addToSet: { connections: currentUser._id },
    });

    // create notification
    const notification = new Notification({
      sender: currentUser._id,
      recipient: connection.sender._id,
      type: "connectionAccepted",
    });

    await notification.save();

    res.status(200).json({ message: "Connection accepted successfully" });
  } catch (err) {
    next(err);
  }
};

// reject friend request
const rejectRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { connectionId } = req.params;
    const currentUser = req.user;

    if (!connectionId) {
      return res.status(400).json({ message: "connectionId is required" });
    }

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    if (connection.recipient._id.toString() !== currentUser._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to reject this request" });
    }

    if (connection.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    connection.status = "rejected";
    await connection.save();

    res.status(200).json({ message: "Connection rejected successfully" });
  } catch (err) {
    next(err);
  }
};

// get all friend requests
const getFriendRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;

    const friendRequests = await Connection.find({
      recipient: currentUser._id,
      status: "pending",
    }).populate("sender", "name email username profilePic");

    res.status(200).json({ friendRequests });
  } catch (err) {
    next(err);
  }
};

// get friendlist of logged in user
const getFriendlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;

    const friends = await Connection.find({
      $or: [{ sender: currentUser._id }, { recipient: currentUser._id }],
      status: "accepted",
    })
      .populate("sender", "name email username profilePic")
      .populate("recipient", "name email username profilePic");

    // Map the result to extract the friend information
    const friendList = friends.map((connection) => {
      // If currentUser is the sender, the friend is the recipient and vice versa
      return connection.sender._id.equals(currentUser._id)
        ? connection.recipient
        : connection.sender;
    });

    res.status(200).json({ friendList });
  } catch (err) {
    next(err);
  }
};

// remove friend
const removeFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { friendId } = req.params;
    const currentUser = req.user;

    if (!friendId) {
      return res.status(400).json({ message: "friendId is required" });
    }

  } catch (err) {
    next(err);
  }
}

export {
  friendRequest,
  acceptRequest,
  rejectRequest,
  getFriendRequests,
  getFriendlist,
};
