import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHadler from "./middlewares/globalErrorHadler";
const app = express();

// Third party middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// App routes

app.get("/", (req, res, next) => {
  res.send("hello world");
});



// Global error handler
app.use(globalErrorHadler);

export default app;