import express from "express";
import cors from "cors";

import apiRouter from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running"
  });
});

app.use("/api", apiRouter);

export default app;