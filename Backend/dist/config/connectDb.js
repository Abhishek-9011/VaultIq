"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    try {
        await mongoose_1.default.connect("mongodb+srv://abhishek774901:Jq3k8nyWi9zfxtS9@cluster0.xt6sa.mongodb.net/VaultIq");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
}
