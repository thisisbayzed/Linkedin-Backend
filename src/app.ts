import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHadler from "./middlewares/globalErrorHadler";
import AuthenticationRouter from "./routes/authencations";
import UsersRouter from "./routes/users";
const app = express();

// Third party middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// App routes
app.use("/api/v1/auth", AuthenticationRouter);
app.use("/api/v1/users", UsersRouter);

// Global error handler
app.use(globalErrorHadler);

export default app;
