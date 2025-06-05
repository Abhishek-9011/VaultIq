"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("../controllers/content.controller");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
router.post("/content", middleware_1.userMiddleware, content_controller_1.addContent);
router.get("/content", middleware_1.userMiddleware, content_controller_1.getContent);
router.delete("/content", middleware_1.userMiddleware, content_controller_1.deleteContent);
exports.default = router;
