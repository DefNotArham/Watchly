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

    const room = await Room.findById(roomId);

    if (!room)
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });

    const isUserInRoom = room.users.some(
      (id) => id.toString() === user._id.toString(),
    );

    if (!isUserInRoom)
      return res.status(403).json({
        success: false,
        code: "userNotInRoom",
        message:
          "You do not have access to this room. Please enter through join code",
      });

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
