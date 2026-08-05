import type { Request, Response } from "express";
import Room from "../../models/Room.model.js";
import Message from "../../models/Message.model.js";

const loadMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    if (!roomId) {
      return res.status(400).json({
        message: "Room ID is required",
      });
    }

    const room = await Room.findOne({ _id: roomId });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const messages = await Message.find({ roomId }).populate("sender");

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default loadMessages;
