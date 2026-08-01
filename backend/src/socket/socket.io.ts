import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User conencted", socket.id);

    socket.on("disconnected", () => {
      console.log("User disconnected", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};
