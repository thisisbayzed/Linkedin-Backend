import { Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globalErrorHadler = (err: HttpError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message: message,
    stack: config.APP_STATUS === "development" ? err.stack : null,
  });
};

export default globalErrorHadler;