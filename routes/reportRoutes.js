import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { monthlyReport } from "../controller/reportController.js";

const router = express.Router();
router.use(authenticate);

router.get("/monthly", monthlyReport); 
export default router;
