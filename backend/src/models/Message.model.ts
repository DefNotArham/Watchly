import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, maxlength: 500 },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
