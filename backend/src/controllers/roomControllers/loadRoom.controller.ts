import type { Response, Request } from "express";

import User from "../../models/User.model.js";
import Room from "../../models/Room.model.js";

const loadRoomController = async (req: Request, res: Response) => {
  const { roomId, clientId } = req.query;

  try {
    if (!roomId)
      return res.status(404).json({
        success: false,
        message: "RoomId not found",
      });

    if (!clientId || typeof clientId !== "string")
      return res.status(404).json({
        success: false,
        message: "Client Id not found",
      });

    const user = await User.findOne({ clientId });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    let room = await Room.findById(roomId).populate("users").populate("owner");

    if (!room)
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    room = await Room.findById(roomId).populate("users").populate("owner");

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default loadRoomController;
