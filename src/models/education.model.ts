import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school: {
      type: String,
      required: [true, "School name is required"],
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
    },
    from: {
      type: Date,
      required: [true, "Start date is required"],
    },
    to: {
      type: Date,
    },
  },
  { _id: false } // This prevents creating an extra _id for each education entry
);

export default educationSchema;
