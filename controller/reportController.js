import Expense from "../model/expenseModel.js";
import Budget from "../model/budgetModel.js";
import Category from "../model/categoryModel.js";
import mongoose from "mongoose";

export const monthlyReport = async (req, res) => {
  const userId = req.user.id;
  const year = Number(req.query.year);
  const month = Number(req.query.month);
  if (!year || !month) return res.status(400).json({ message: "year & month are required" });

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const spent = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId), date: { $gte: start, $lt: end } } },
    { $group: { _id: "$categoryId", spentCents: { $sum: "$amountCents" } } }
  ]);

  const spentMap = spent.reduce((acc, s) => { acc[s._id.toString()] = s.spentCents; return acc; }, {});

  const categories = await Category.find({ userId });

  const budgets = await Budget.find({ userId, year, month });
  const budgetMap = budgets.reduce((acc, b) => { acc[b.categoryId.toString()] = b.limitCents; return acc; }, {});

  const report = categories.map(c => {
    const cid = c._id.toString();
    const spentCents = spentMap[cid] || 0;
    const budgetCents = budgetMap[cid] || 0;
    return {
      categoryId: c._id,
      categoryName: c.name,
      color: c.color,
      spentCents,
      budgetCents,
      remainingCents: budgetCents - spentCents
    };
  });

  res.json(report);
};
