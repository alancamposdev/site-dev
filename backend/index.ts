import "dotenv/config";
import express from "express";
import userRouter from "./src/routes/userRouter";
import { startServer } from "./src/server";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

app.use("/user", userRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;

startServer(app);