import express from "express";
import authHandler from "../middlewares/authHandler";
import { acceptRequest, friendRequest, getFriendlist, getFriendRequests, rejectRequest, removeFriend } from "../controllers/connections";
const ConnectionRouter = express.Router();

ConnectionRouter.post("/request/:friendRequestId", authHandler, friendRequest);
ConnectionRouter.put("/accepted/:connectionId", authHandler, acceptRequest);
ConnectionRouter.put("/rejected/:connectionId", authHandler, rejectRequest);
ConnectionRouter.get("/friendRequests", authHandler , getFriendRequests);
ConnectionRouter.get("/friendlist", authHandler , getFriendlist);
ConnectionRouter.delete("/:friendId", authHandler , removeFriend);

export default ConnectionRouter;
