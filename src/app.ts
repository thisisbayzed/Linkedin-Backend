import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHadler from "./middlewares/globalErrorHadler";
import AuthenticationRouter from "./routes/authencations";
import UsersRouter from "./routes/users";
import PostRouter from "./routes/post";
import CommentRouter from "./routes/comments";
import NotificationRouter from "./routes/notification";
import likesRouter from "./routes/likes";
import ConnectionRouter from "./routes/connections";
const app = express();

// Third party middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// App routes
app.use("/api/v1/auth", AuthenticationRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/posts", PostRouter);
app.use("/api/v1/comments", CommentRouter);
app.use("/api/v1/notifications", NotificationRouter);
app.use("/api/v1/likes", likesRouter);
app.use("api/v1/connections", (req, res) => {
    res.status(404).json({ message: "Not found" });
});

// Global error handler
app.use(globalErrorHadler);

export default app;
