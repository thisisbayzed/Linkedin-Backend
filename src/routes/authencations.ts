import express from "express";
import { loginUser, registerUser } from "../controllers/authencations";

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/register", registerUser);

AuthenticationRouter.post("/login", loginUser);

export default AuthenticationRouter;
