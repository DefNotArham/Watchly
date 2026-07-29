import mongoose from "mongoose";
import { nanoid } from "nanoid";

const RoomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isOnline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  joinCode: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    default: () => nanoid(8),
  },
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
