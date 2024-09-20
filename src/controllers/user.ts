import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { Education, Experience, UserProfile } from "../types/userProfile";
import uploadToCloudinary from "../utils/uploadHandlers";

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

// update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allowedUpdates = [
      "name",
      "username",
      "profilePic",
      "coverPic",
      "location",
      "bio",
      "about",
      "skills",
      "expreience",
      "education",
    ];

    const updateData: Partial<UserProfile> = {};

    // Loop through allowedUpdates to update valid fields
    for (const field of allowedUpdates) {
      if (req.body[field]) {
        // Special handling for skills, experience, and education arrays
        if (field === "skills" && Array.isArray(req.body[field])) {
          updateData[field] = req.body[field] as string[]; // Explicit type assertion for skills array
        } else if (field === "experience" && Array.isArray(req.body[field])) {
          updateData[field] = req.body[field] as Experience[]; // Explicit type assertion for experience array
        } else if (field === "education" && Array.isArray(req.body[field])) {
          updateData[field] = req.body[field] as Education[]; // Explicit type assertion for education array
        } else {
          // For all other fields, assign them directly to updateData
          updateData[field as keyof UserProfile] = req.body[field];
        }
      }
    }

    // new code here
    const files = req.files as {
      profileImage?: Express.Multer.File[];
      coverImage?: Express.Multer.File[];
    };

    // Upload profile image if provided
    if (files?.profileImage && files.profileImage[0]?.buffer) {
      const result = await uploadToCloudinary(
        files.profileImage[0].buffer,
        "profile"
      );
      updateData.profilePic = result.secure_url; // Update the profilePic URL from Cloudinary
    }

    // Upload cover image if provided
    if (files?.coverImage && files.coverImage[0]?.buffer) {
      const result = await uploadToCloudinary(
        files.coverImage[0].buffer,
        "cover"
      );
      updateData.coverPic = result.secure_url; // Update the coverPic URL from Cloudinary
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export { currentUser, suggestedUser, singleUser, updateUser };
