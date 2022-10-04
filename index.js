import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connection has been established successfully");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(8000, () => {
  console.log("Sever is runing");
});
