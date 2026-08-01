import type { Request, Response } from "express";

import User from "../../models/User.model.js";
import Room from "../../models/Room.model.js";

type clientType = {
  clientId: string;
  username?: string;
};

const createRoomController = async (
  req: Request<{}, {}, clientType>,
  res: Response,
) => {
  const { clientId, username } = req.body;

  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "ClientId not found" });

    const user = await User.findOne({ clientId });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    if (!username || !username.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    if (username && username.trim() && username !== user.username) {
      user.username = username.trim();
      await user.save();
    }

    const room = await Room.create({
      owner: user?._id,
      users: [user?._id],
    });

    return res.status(200).json({ success: true, room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default createRoomController;
