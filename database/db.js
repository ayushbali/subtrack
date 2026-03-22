import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";
// import process from "node:process";

if (!DB_URL) {
  throw new Error(
    "Please provide a valid MongoDB connection string in the environment(development/production) variables.",
  );
}

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode.`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
