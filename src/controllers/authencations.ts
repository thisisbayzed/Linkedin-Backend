import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body;

    // Validate user input
    if (!(email | password | name | username)) {
      return res.status(400).send("All input is required");
    }

    // check if useremail already exist
    const userExistemail = await User.findOne({ email });

    if (userExistemail) {
      return res.status(409).send("Useremail Already Exist. Please Login");
    }

    // check if username already exist
    const userExistusername = await User.findOne({ username });

    if (userExistusername) {
      return res.status(409).send("Username Already Exist. Please Login");
    }

    // check the password validation
    if (password.length < 6) {
      return res.status(400).send("Password must be atleast 6 characters long");
    }

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create user in the database

    const user = await User.create({
      name,
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    await user.save();

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, config.APP_STATUS, {
      expiresIn: "2h",
    });

    // set token in cookie
    res.cookie("secureToken", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: config.APP_STATUS === "development" ? false : true,
    });

    res.status(201).send({ user, token });
  } catch (err) {
    next(err);
  }
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("login");
};

export { registerUser, loginUser };
