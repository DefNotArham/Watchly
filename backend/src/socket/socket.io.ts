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
        socket.data.clientId = clientId;
        socket.data.roomId = roomId;
        const user = await User.findOne({ clientId });

        if (!user) {
          console.log("User not found");
          return;
        }

        await Room.findByIdAndUpdate(roomId, {
          $addToSet: {
            users: user._id,
          },
        });

        socket.join(roomId);

        const updatedRoom = await Room.findById(roomId)
          .populate("users")
          .populate("owner");

        io.to(roomId).emit("room-updated", updatedRoom);

        console.log(`${clientId} joined room ${roomId}`);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("leave-room", async ({ clientId, roomId }) => {
      try {
        const user = await User.findOne({ clientId });

        if (!user) {
          console.log("User not found");
          return;
        }

        await Room.findByIdAndUpdate(roomId, {
          $pull: {
            users: user._id,
          },
        });

        socket.leave(roomId);

        const updatedRoom = await Room.findById(roomId)
          .populate("users")
          .populate("owner");

        io.to(roomId).emit("room-updated", updatedRoom);

        console.log(`${clientId} left room ${roomId}`);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("load-video", async ({ roomId, videoId }) => {
      await Room.findByIdAndUpdate(roomId, {
        videoId,
        currentTime: 0,
        isPlaying: false,
      });

      io.to(roomId).emit("video-loaded", {
        videoId,
        currentTime: 0,
        isPlaying: false,
      });
    });

    socket.on("video-play", async ({ roomId, currentTime }) => {
      try {
        await Room.findByIdAndUpdate(roomId, {
          currentTime,
          isPlaying: true,
        });

        socket.to(roomId).emit("video-play", {
          currentTime,
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("video-pause", async ({ roomId, currentTime }) => {
      try {
        await Room.findByIdAndUpdate(roomId, {
          currentTime,
        });

        socket.to(roomId).emit("video-pause", {
          currentTime,
        });
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("video-seek", async ({ roomId, currentTime }) => {
      try {
        const { clientId, roomId } = socket.data;

        if (!clientId || !roomId) {
          return;
        }

        const user = await User.findOne({ clientId });

        if (!user) {
          return;
        }

        const room = await Room.findByIdAndUpdate(
          roomId,
          {
            $pull: {
              users: user._id,
            },
          },
          { new: true },
        );

        if (!room) {
          return;
        }

        // Delete room if nobody is left
        if (room.users.length === 0) {
          await Room.findByIdAndDelete(roomId);

          console.log(`Deleted empty room ${roomId}`);
          return;
        }

        const updatedRoom = await Room.findById(roomId)
          .populate("users")
          .populate("owner");

        io.to(roomId).emit("room-updated", updatedRoom);

        console.log(`${clientId} disconnected from room ${roomId}`);
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
