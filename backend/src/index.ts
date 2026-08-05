import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./socket/socket.io.js";

import connectDb from "./db/connectDB.js";

import userRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT;
const frontend = process.env.FRONTEND;

app.use(express.json());

app.use(
  cors({
    origin: frontend,
    credentials: true,
  }),
);

app.use("/user", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);

initSocket(httpServer);

httpServer.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
