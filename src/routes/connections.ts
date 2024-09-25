import express from "express";
import authHandler from "../middlewares/authHandler";
import { friendRequest } from "../controllers/connections";
const ConnectionRouter = express.Router();

ConnectionRouter.get("/request", authHandler, friendRequest);

export default ConnectionRouter;
