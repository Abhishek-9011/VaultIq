"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContent = exports.addContent = void 0;
const content_model_1 = __importDefault(require("../models/content.model"));
const addContent = async (req, res) => {
    const { title, link, type } = req.body;
    try {
        await content_model_1.default.create({
            title,
            link,
            type,
            // @ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({ message: "content addes successfully" });
    }
    catch (error) {
        res.json({ message: "some error occured" + error.message });
    }
};
exports.addContent = addContent;
const getContent = async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await content_model_1.default.find({ userId }).populate("userId", "username");
    res.json({ content: content });
};
exports.getContent = getContent;
const deleteContent = async (req, res) => {
    try {
        const { contentId } = req.body;
        if (!contentId) {
            return res.status(400).json({ message: "contentId is required" });
        }
        const result = await content_model_1.default.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId,
        });
        if (result.deletedCount === 0) {
            return res
                .status(404)
                .json({ message: "Content not found or not owned by user" });
        }
        res.json({ message: "Content deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting content",
            //@ts-ignore
            error: error.message,
        });
    }
};
exports.deleteContent = deleteContent;
