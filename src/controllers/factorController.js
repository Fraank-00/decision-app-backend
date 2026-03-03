import pool from "../config/db.js";

// CREAR FACTOR
export const createFactor = async (req, res) => {
  try {
    const { description, value, decision_id } = req.body;
    const userId = req.user.id;

    const decision = await pool.query(
      "SELECT * FROM decisions WHERE id = $1 AND user_id = $2",
      [decision_id, userId]
    );

    if (decision.rows.length === 0) {
      return res.status(404).json({ message: "Decisión no encontrada" });
    }

    const newFactor = await pool.query(
      "INSERT INTO factors (description, value, decision_id) VALUES ($1, $2, $3) RETURNING *",
      [description, value, decision_id]
    );

    res.status(201).json(newFactor.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// OBTENER FACTORES DE UNA DECISION
export const getFactors = async (req, res) => {
  try {
    const { decision_id } = req.params;

    const factors = await pool.query(
      "SELECT * FROM factors WHERE decision_id = $1",
      [decision_id]
    );

    res.json(factors.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};