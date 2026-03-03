import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import decisionRoutes from "./routes/decisionRoutes.js";
import factorRoutes from "./routes/factorRoutes.js";

const app = express();

app.use(cors({
  origin: "https://decision-app-frontend-h1yo.onrender.com"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/decisions", decisionRoutes);
app.use("/api/factors", factorRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Ruta protegida OK",
    user: req.user,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

pool.connect()
  .then(() => console.log("DB conectada 🐘"))
  .catch(err => console.error(err));