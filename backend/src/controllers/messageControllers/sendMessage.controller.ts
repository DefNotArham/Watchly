import Message from "../../models/Message.model.js";
import Room from "../../models/Room.model.js";
import User from "../../models/User.model.js";

import type { Request, Response } from "express";

import { getIO } from "../../socket/socket.io.js";

type messageType = {
  content: string;
  clientId: string;
  roomId: string;
};

// Mirrored on the Message model (maxlength) and in the frontend's ChatPanel
// input — checked explicitly here too, rather than relying only on the
// Mongoose validator, so a request over the limit gets a clear 400 instead
// of a generic ValidationError falling into the catch-all 500 below.
const MAX_MESSAGE_LENGTH = 500;

const sendMessage = async (
  req: Request<{}, {}, messageType>,
  res: Response,
) => {
  const { content, clientId, roomId } = req.body;
  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "ClientId not found" });

    if (!content)
      return res
        .status(400)
        .json({ success: false, message: "Content not found" });

    if (content.length > MAX_MESSAGE_LENGTH)
      return res.status(400).json({
        success: false,
        message: `Content must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
      });

    const user = await User.findOne({ clientId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const room = await Room.findOne({ _id: roomId });
    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });

    const message = await Message.create({
      content,
      sender: user?._id,
      roomId: room?._id,
    });

    await message.populate("sender");

    getIO().to(roomId).emit("new-message", message);

    await message.populate("sender");

    return res.status(200).json({ success: true, newMessage: message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: " Server error" });
  }
};

export default sendMessage;
