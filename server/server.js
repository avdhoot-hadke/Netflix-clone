// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";

const app = express();
const port = 3001;

// Enable CORS for all routes
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());

//mongoDB connect
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Db connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

main().catch((err) => console.log(err));

// Your routes go here
app.get("/", (req, res) => {
  res.send("Running Server");
});
app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
