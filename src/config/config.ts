import "dotenv/config";

const _config = {
  PORT: process.env.PORT as string,
  DATABASE: process.env.DATABASE as string,
  APP_STATUS: process.env.NODE_ENV as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  MAILTRAP: process.env.MAILTRAP as string,
  EMAIL_FROM: process.env.EMAIL_FROM as string,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME as string,
  DEV_CLIENT: process.env.DEV_CLIENT as string,
  Cloudinary_Cloud_Name: process.env.Cloudinary_Cloud_Name as string,
  Cloudinary_API_Key: process.env.Cloudinary_API_Key as string,
  Cloudinary_API_Secret: process.env.Cloudinary_API_Secret as string,
};

export const config = Object.freeze(_config);
