import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Experience title is required"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    from: {
      type: Date,
      required: [true, "Start date is required"],
    },
    to: {
      type: Date,
    },
    description: {
      type: String,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
  },
  { _id: false } // This prevents creating an extra _id for each experience entry
);

export default experienceSchema;
