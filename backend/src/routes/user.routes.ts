import express from "express";

import createUserController from "../controllers/userControllers/create-user.controller.js";

const router = express.Router();

router.post("/create-user", createUserController);

export default router;
