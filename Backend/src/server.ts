import express from "express";
import cors from "cors";
import { connectDb } from "./config/connectDb.js";
import userRouter from "./routes/user.route.js";
import contentRouter from "./routes/content.route.js";
import shareRouter from "./routes/share.route.js";
const app = express();

app.use(express.json());
app.use(cors());

connectDb();

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", shareRouter);
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
