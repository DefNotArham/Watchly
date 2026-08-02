import { Server } from "socket.io";
import dotenv from "dotenv";

import User from "../models/User.model.js";
import Room from "../models/Room.model.js";

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

    socket.on("join-room", async ({ clientId, roomId }) => {
      try {
        const user = await User.findOne({ clientId });

        if (!user) {
          console.log("User not found");
          return;
        }

        const room = await Room.findById(roomId);

        if (!room) {
          console.log("Room not found");
          return;
        }

        const isUserInRoom = room.users.some(
          (id) => id.toString() === user._id.toString(),
        );

        if (!isUserInRoom) {
          room.users.push(user._id);
          await room.save();
        }

        socket.join(roomId);

        socket.data.clientId = clientId;
        socket.data.roomId = roomId;

        console.log(`${clientId} joined room ${roomId}`);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", async () => {
      try {
        const { clientId, roomId } = socket.data;

        if (!clientId || !roomId) return;

        const user = await User.findOne({ clientId });

        if (!user) return;

        await Room.findByIdAndUpdate(roomId, {
          $pull: {
            users: user._id,
          },
        });

        console.log(`${clientId} left room ${roomId}`);
      } catch (error) {
        console.log(error);
      }
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
