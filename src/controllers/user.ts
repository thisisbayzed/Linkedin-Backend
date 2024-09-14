import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

// get current logged in user
const currentUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

// get suggestions users
const suggestedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentloggedinUser = req.user._id;

    const currentUser = await User.findById(currentloggedinUser).select(
      "connections"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // find users who are not already connected, and also do not recommend our own profile!! right?

    const suggestions = await User.find({
      _id: {
        $ne: currentloggedinUser,
        $nin: currentUser.connections,
      },
    })
      .select("name username profilePic , bio")
      .limit(5);

    res.json({ suggestions });
  } catch (err) {
    next(err);
  }
};

// get singal user
const singleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;

    console.log(username);

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export { currentUser, suggestedUser, singleUser };
