import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authencations";

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/register", registerUser);

AuthenticationRouter.post("/login", loginUser);

AuthenticationRouter.post("/logout" , logoutUser )

export default AuthenticationRouter;
