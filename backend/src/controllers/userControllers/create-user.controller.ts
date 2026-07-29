import type { Request, Response } from "express";

type UserType = {
  clientId: String;
};

const createUserController = async (
  req: Request<{}, {}, UserType>,
  res: Response,
) => {
  const { clientId } = req.body;
  try {
    if (clientId)
      return res
        .status(404)
        .json({ success: false, message: "ClientId not found" });
  } catch (error) {}
};

export default createUserController;
