import pool from "../config/db.js";

// CREAR DECISION
export const createDecision = async (req, res) => {
  try {
    const { title } = req.body;

    const userId = req.user.id;

    const newDecision = await pool.query(
      "INSERT INTO decisions (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, userId]
    );

    res.status(201).json(newDecision.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER TODAS LAS DECISIONES DEL USUARIO
export const getDecisions = async (req, res) => {
  try {
    const userId = req.user.id;

    const decisions = await pool.query(
      "SELECT * FROM decisions WHERE user_id = $1",
      [userId]
    );

    res.json(decisions.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR
export const updateDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const userId = req.user.id;

    const result = await pool.query(
      "UPDATE decisions SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [title, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR
export const deleteDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM decisions WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No encontrada" });
    }

    res.json({ message: "Eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CALCULAR RESULTADO
export const getDecisionResult = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // verificar decision
    const decision = await pool.query(
      "SELECT * FROM decisions WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (decision.rows.length === 0) {
      return res.status(404).json({ message: "No encontrada" });
    }

    // obtener factores
    const factors = await pool.query(
      "SELECT value FROM factors WHERE decision_id = $1",
      [id]
    );

    // calcular suma
    const total = factors.rows.reduce((sum, f) => sum + f.value, 0);

    let recommendation = "Neutral";

    if (total > 0) recommendation = "Conviene";
    if (total < 0) recommendation = "No conviene";

    res.json({
      total,
      recommendation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};