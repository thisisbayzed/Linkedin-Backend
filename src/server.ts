import app from "./app";
import { config } from "./config/config";
import connectDB from "./db/mongodb";

const port = config.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
