import mongoose from "mongoose";
import { config } from "../config/config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log(" MongoDB connection error", err);
    });

    await mongoose.connect(config.DATABASE as string);
  } catch (err) {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
  }
};

export default connectDB;