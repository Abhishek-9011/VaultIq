"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = require("../config/Token");
const userMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(token);
    const decoded = jsonwebtoken_1.default.verify(token, Token_1.JWT_PASSWORD);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in",
        });
    }
};
exports.userMiddleware = userMiddleware;
