import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//@ts-ignore
const dbUrl: string = process.env.MONGO_DB_URL;
export async function connectDb() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
