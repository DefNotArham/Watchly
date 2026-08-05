import Message from "../../models/Message.model.js";
import Room from "../../models/Room.model.js";
import User from "../../models/User.model.js";

import type { Request, Response } from "express";

const sendMessage = async (req: Request, res: Response) => {
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
      room: room?._id,
    });

    await message.populate("sender");

    return res.status(200).json({ success: true, newMessage: message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: " Server error" });
  }
};

export default sendMessage;
