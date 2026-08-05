import express from "express";
import sendMessage from "../controllers/messageControllers/sendMessage.controller.js";

const router = express.Router();

router.post("/send-message", sendMessage);

export default router;
