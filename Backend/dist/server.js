"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_model_js_1 = __importDefault(require("./models/user.model.js"));
const content_model_js_1 = __importDefault(require("./models/content.model.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const Token_js_1 = require("./config/Token.js");
const middleware_js_1 = require("./middleware.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
async function connectDb() {
    try {
        await mongoose_1.default.connect("mongodb+srv://abhishek774901:Jq3k8nyWi9zfxtS9@cluster0.xt6sa.mongodb.net/VaultIq");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
}
connectDb();
app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        await user_model_js_1.default.create({
            username,
            password,
        });
        res.json({ message: "user signed up succesfully" });
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await user_model_js_1.default.findOne({ username, password });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
            }, Token_js_1.JWT_PASSWORD);
            res.json({ message: "user signed in successfully", token: token });
        }
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
});
app.post("/api/v1/content", middleware_js_1.userMiddleware, async (req, res) => {
    const { title, link } = req.body;
    try {
        await content_model_js_1.default.create({
            title,
            link,
            //
            // @ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({ message: "content addes successfully" });
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
});
app.get("/api/v1/content", middleware_js_1.userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await content_model_js_1.default.find({ userId }).populate('userId', 'username');
    res.json({ content: content });
});
app.delete("/ap1/v1/content", (req, res) => {
    const { name, email, password } = req.body;
});
app.get("/ap1/v1/brain/:shareLink", (req, res) => {
    const { name, email, password } = req.body;
});
app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});
