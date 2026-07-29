import express from "express";

const router = express.Router();

import createRoomController from "../controllers/roomControllers/createRoom.controller.js";

router.post("/create-room", createRoomController);

export default router;
