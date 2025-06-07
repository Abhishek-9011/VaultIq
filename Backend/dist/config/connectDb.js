"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectDb() {
    try {
        //@ts-ignore
        await mongoose_1.default.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
}
