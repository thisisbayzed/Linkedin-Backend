import express from "express";
import authHandler from "../middlewares/authHandler";
import { acceptRequest, friendRequest } from "../controllers/connections";
const ConnectionRouter = express.Router();

ConnectionRouter.post("/request/:friendRequestId", authHandler, friendRequest);
ConnectionRouter.post("/accepted/:connectionId", authHandler, acceptRequest);

export default ConnectionRouter;
