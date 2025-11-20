import Category from "../model/categoryModel.js";
import Expense from "../model/expenseModel.js";
import Budget from "../model/budgetModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const { month, year } = req.query;
    const userId = req.user.id;

    const m = Number(month);  
    const y = Number(year);

    const categories = await Category.find({ userId });

    const budgets = await Budget.find({ userId, month: m, year: y });
    const budgetMap = budgets.reduce((acc, b) => {
      acc[b.categoryId.toString()] = b.limitCents;
      return acc;
    }, {});

    const expenses = await Expense.find({
      userId,
      date: {
        $gte: new Date(y, m, 1),
        $lt: new Date(y, m + 1, 1),
      },
    });

    const result = categories.map((cat) => {
      const spent = expenses
        .filter((e) => e.categoryId.toString() === cat._id.toString())
        .reduce((sum, e) => sum + e.amountCents, 0);

      return {
        _id: cat._id,
        name: cat.name,
        color: cat.color,
        spent,
        limitCents: budgetMap[cat._id.toString()] || 0,
      };
    });

    res.json({ categories: result });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
