import express from "express";
import {
  generateShareLink,
  getShareLink,
} from "../controllers/share.controller";
import { userMiddleware } from "../middleware/middleware";
const router = express.Router();

router.post("/brain/share", userMiddleware, generateShareLink);
router.get("/brain/:shareLink", getShareLink);
export default router;
