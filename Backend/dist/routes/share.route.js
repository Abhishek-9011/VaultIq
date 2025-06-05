"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const share_controller_1 = require("../controllers/share.controller");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
router.post("/brain/share", middleware_1.userMiddleware, share_controller_1.generateShareLink);
router.get("/brain/:shareLink", share_controller_1.getShareLink);
exports.default = router;
