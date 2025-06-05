"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShareLink = exports.generateShareLink = void 0;
const content_model_1 = __importDefault(require("../models/content.model"));
const link_model_1 = __importDefault(require("../models/link.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const generateShareLink = async (req, res) => {
    const { share } = req.body;
    if (share) {
        //@ts-ignore
        const existingLink = await link_model_1.default.findOne({ userId: req.userId });
        if (existingLink) {
            //@ts-ignore
            res.json({ hash: existingLink.hash });
            return;
        }
        else {
            const hash = (0, utils_1.random)(10);
            await link_model_1.default.create({
                hash: hash,
                //@ts-ignore
                userId: req.userId,
            });
            res.json({
                message: "/share/" + hash,
            });
        }
    }
    else {
        //@ts-ignore
        await link_model_1.default.deleteOne({ userId: req.userId });
        res.json({
            message: "Removed Link",
        });
    }
};
exports.generateShareLink = generateShareLink;
const getShareLink = async (req, res) => {
    const hash = req.params.shareLink;
    const link = await link_model_1.default.findOne({ hash });
    if (!link) {
        res.status(403).json({
            message: "incorrect input",
        });
        return;
    }
    const content = await content_model_1.default.find({ userId: link.userId });
    const user = await user_model_1.default.findOne({ _id: link.userId });
    res.json({
        //@ts-ignore
        username: user?.username,
        content: content,
    });
};
exports.getShareLink = getShareLink;
