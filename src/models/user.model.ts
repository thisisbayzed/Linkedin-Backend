import mongoose from "mongoose";
import experienceSchema from "./experience.model";
import educationSchema from "./education.model";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // Removes any extra spaces
      minlength: [3, "Name must be at least 3 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Ensures uniqueness of the username
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures uniqueness of the email
      lowercase: true, // Automatically converts email to lowercase
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email validation regex
        },
        message: (props: any) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "Linkedin Clone User",
      maxlength: [160, "Bio cannot exceed 160 characters"],
    },
    location: {
      type: String,
      default: "EARTH",
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    about: {
      type: String,
      default: "About me",
      maxlength: [500, "About section cannot exceed 500 characters"],
    },
    skills: {
      type: [String],
      default: [], // Ensures skills is always an array
    },
    expreience: {
      type: [experienceSchema],
      default: [],
    },
    education: {
      type: [educationSchema],
      default: [],
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
