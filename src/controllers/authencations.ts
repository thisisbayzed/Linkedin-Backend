import { NextFunction, Request, Response } from "express";

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("register");
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  res.send("login");
};

export { registerUser, loginUser };
