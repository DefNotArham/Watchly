import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, unique: true },
    username: {
      type: String,
      default: () => `user-${crypto.randomBytes(4).toString("hex")}`,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;
