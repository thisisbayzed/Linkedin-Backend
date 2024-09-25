import express from "express";
import authHandler from "../middlewares/authHandler";
import { friendRequest } from "../controllers/connections";
const ConnectionRouter = express.Router();

ConnectionRouter.post("/request/:friendRequestId", authHandler, friendRequest);

export default ConnectionRouter;
