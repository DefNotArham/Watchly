import express from "express";

const router = express.Router();

import createRoomController from "../controllers/roomControllers/createRoom.controller.js";
import loadRoomController from "../controllers/roomControllers/loadRoom.controller.js";

router.post("/create-room", createRoomController);
router.get("/load-room", loadRoomController);

export default router;
