import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import decisionRoutes from "./routes/decisionRoutes.js";
import factorRoutes from "./routes/factorRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

const app = express();

// CORS PRODUCCIÓN
app.use(cors({
  origin: "https://decision-app-frontend-h1yo.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas
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

// 🔥 FUNCIÓN PARA INICIAR TODO
const startServer = async () => {
  try {
    await pool.connect();
    console.log("DB conectada 🐘");

    // 🔥 CREAR TABLAS SI NO EXISTEN
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS decisions (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS factors (
        id SERIAL PRIMARY KEY,
        description TEXT,
        value INTEGER,
        decision_id INTEGER REFERENCES decisions(id) ON DELETE CASCADE
      );
    `);

    console.log("Tablas verificadas ✅");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error("Error iniciando servidor:", error);
  }
};

startServer()