import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createExpense } from "../controller/expenseController.js";

const router = express.Router();
router.use(authenticate);

router.post("/", createExpense);
export default router;
