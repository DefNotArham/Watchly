import express from "express";

const router = express.Router();

import createRoomController from "../controllers/roomControllers/createRoom.controller.js";
import loadRoomController from "../controllers/roomControllers/loadRoom.controller.js";
import joinRoomController from "../controllers/roomControllers/joinRoom.controller.js";

router.post("/create-room", createRoomController);
router.get("/load-room", loadRoomController);
router.post("/join-room", joinRoomController);

export default router;
