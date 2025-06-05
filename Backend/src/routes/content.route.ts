import express from "express";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
import { userMiddleware } from "../middleware/middleware";
const router = express.Router();

router.post("/content", userMiddleware, addContent);
router.get("/content", userMiddleware, getContent);
router.delete("/content", userMiddleware, deleteContent);

export default router;
