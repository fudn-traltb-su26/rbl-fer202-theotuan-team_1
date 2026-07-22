import express from "express";
import { getEvents, getEventById, getFeaturedEvents, createEvent } from "../controllers/eventController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("coverImage"), createEvent); // 🆕 Thêm dòng POST để tạo sự kiện
router.get("/featured", getFeaturedEvents); // 🆕 Thêm dòng này
router.get("/search", getEvents);
router.get("/:id", getEventById);

export default router;      
