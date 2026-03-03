import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validar
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // verificar si existe
    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // guardar usuario
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    );

    res.status(201).json({
      message: "Usuario creado",
      user: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    const foundUser = user.rows[0];

    // comparar password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // generar token
    const token = jwt.sign(
      { id: foundUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};