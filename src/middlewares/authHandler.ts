import jwt from "jsonwebtoken";
import { config } from "../config/config";
import User from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomJwtPayload } from "../types/types";

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["secureToken"];

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const decoded = jwt.verify(token, config.JWT_SECRET) as CustomJwtPayload;

    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }

    const user = await User.findById(decoded.user_id).select("-password");

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
};

export default authHandler;
