import express from "express";
import sendMessage from "../controllers/messageControllers/sendMessage.controller.js";
import loadMessages from "../controllers/messageControllers/loadMessage.controller.js";

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/load-messages/:roomId", loadMessages);

export default router;
