import express from "express";
import dotenv from "dotenv";

import connectDb from "./db/connectDB.js";

import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/user", userRoutes);

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
