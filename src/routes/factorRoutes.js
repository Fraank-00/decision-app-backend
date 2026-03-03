import express from "express";
import { createFactor, getFactors } from "../controllers/factorController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createFactor);
router.get("/:decision_id", verifyToken, getFactors);

export default router;