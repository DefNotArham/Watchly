import express from "express";

import getOrCreateUserController from "../controllers/userControllers/getOrCreateUser.controller.js";

const router = express.Router();

router.post("/create-user", getOrCreateUserController);

export default router;
