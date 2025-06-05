import mongoose from "mongoose";
export async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://abhishek774901:Jq3k8nyWi9zfxtS9@cluster0.xt6sa.mongodb.net/VaultIq"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}