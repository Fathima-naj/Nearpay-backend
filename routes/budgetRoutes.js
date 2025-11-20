import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getBudgetsForMonth, createOrUpdateBudget, deleteBudget } from "../controller/budgetController.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getBudgetsForMonth); 
router.post("/", createOrUpdateBudget);
router.put("/:id", createOrUpdateBudget); 
router.delete("/:id", deleteBudget);

export default router;
