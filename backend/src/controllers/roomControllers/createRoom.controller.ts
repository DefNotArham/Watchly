import type { Request, Response } from "express";

import User from "../../models/User.model.js";
import Room from "../../models/Room.model.js";

type clientType = {
  clientId: string;
};

const createRoomController = async (
  req: Request<{}, {}, clientType>,
  res: Response,
) => {
  const { clientId } = req.body;

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
