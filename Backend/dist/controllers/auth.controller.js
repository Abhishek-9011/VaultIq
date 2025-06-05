"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const Token_1 = require("../config/Token");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        await user_model_1.default.create({
            username,
            password,
        });
        res.json({ message: "user signed up succesfully" });
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ username, password });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id,
            }, Token_1.JWT_PASSWORD);
            res.json({ message: "user signed in successfully", token: token });
        }
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
};
exports.signin = signin;
