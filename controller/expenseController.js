import Expense from "../model/expenseModel.js";
import Budget from "../model/budgetModel.js";

export const createExpense = async (req, res) => {
  const userId = req.user.id;
  const { categoryId, amountCents, date, note } = req.body;

  if (!categoryId || !amountCents || !date)
    return res.status(400).json({ message: "Missing fields" });

  const expense = await Expense.create({
    userId,
    categoryId,
    amountCents,
    date: new Date(date),
    note,
  });

  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth(); 

  const agg = await Expense.aggregate([
    {
      $match: {
        userId,
        categoryId,
        date: {
          $gte: new Date(year, month, 1),
          $lt: new Date(year, month + 1, 1)
        },
      },
    },
    { $group: { _id: null, total: { $sum: "$amountCents" } } },
  ]);

  const spentCents = agg.length ? agg[0].total : 0;

  const budget = await Budget.findOne({ userId, categoryId, year, month });
  const budgetCents = budget ? budget.limitCents : 0;

  let withinBudget = true;
  let nearLimit = false;
  let exceeded = false;

  if (budgetCents > 0) {
    if (spentCents >= budgetCents * 0.8 && spentCents <= budgetCents) {
      nearLimit = true;
    }
    if (spentCents > budgetCents) {
      withinBudget = false;
      exceeded = true;
    }
  }

  res.status(201).json({
    expense,
    spentCents,
    budgetCents,
    withinBudget,
    nearLimit,
    exceeded,
  });
};
