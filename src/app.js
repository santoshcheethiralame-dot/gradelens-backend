import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("GradeLens API running");
});

export default app;
