import type { Response, Request } from "express";

type RoomType = {
  roomId: string;
};

const loadRoomController = (req: Request, res: Response) => {
  const { roomId } = req.body;
  try {
  } catch (error) {}
};
