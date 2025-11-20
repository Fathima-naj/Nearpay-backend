import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controller/categoryController.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
