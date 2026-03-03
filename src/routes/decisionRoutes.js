import express from "express";
import {
  createDecision,
  getDecisions,
  updateDecision,
  deleteDecision
} from "../controllers/decisionController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { getDecisionResult } from "../controllers/decisionController.js";

const router = express.Router();

router.post("/", verifyToken, createDecision);
router.get("/", verifyToken, getDecisions);
router.put("/:id", verifyToken, updateDecision);
router.delete("/:id", verifyToken, deleteDecision);
router.get("/:id/result", verifyToken, getDecisionResult);

export default router;