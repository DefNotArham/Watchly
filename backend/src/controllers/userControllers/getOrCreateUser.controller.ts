import type { Request, Response } from "express";

import User from "../../models/User.model.js";

type UserType = {
  clientId: string;
};

const getOrCreateUserController = async (
  req: Request<{}, {}, UserType>,
  res: Response,
) => {
  const { clientId } = req.body;

  try {
    if (!clientId)
      return res
        .status(404)
        .json({ success: false, message: "ClientId not found" });

    const existingUser = await User.findOne({ clientId });

    if (!existingUser) {
      const user = await User.create({ clientId });

      return res.status(200).json({ success: true, user });
    }

    return res.status(200).json({
      success: true,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default getOrCreateUserController;
