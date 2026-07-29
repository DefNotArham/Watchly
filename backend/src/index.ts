import express from "express";
import dotenv from "dotenv";

import connectDb from "./db/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDb();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
