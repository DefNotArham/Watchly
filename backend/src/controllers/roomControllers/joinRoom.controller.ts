import type { Request, Response } from "express";
import User from "../../models/User.model.js";
import Room from "../../models/Room.model.js";

const joinRoomController = async (req: Request, res: Response) => {
  const { clientId, joinCode, username } = req.body;
  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "ClientId not found" });

    if (!joinCode)
      return res
        .status(400)
        .json({ success: false, message: "Please enter a room code" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (
      username &&
      typeof username === "string" &&
      username.trim() &&
      username.trim() !== user.username
    ) {
      user.username = username.trim();
      await user.save();
    }

    const room = await Room.findOne({
      joinCode: joinCode.toUpperCase(),
    });

    if (!room)
      return res
        .status(404)
        .json({ success: false, message: "Please enter a valid join code" });

    const isUserInRoom = room.users.some(
      (id) => id.toString() === user._id.toString(),
    );

    if (!isUserInRoom) {
      room.users.push(user._id);
      await room.save();
    }

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default joinRoomController;
