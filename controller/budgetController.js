import Category from "../model/categoryModel.js";
import Budget from "../model/budgetModel.js";

export const getBudgetsForMonth = async (req, res) => {
  const userId = req.user.id;
  const year = Number(req.query.year);
  const month = Number(req.query.month); 

  if (year === undefined || month === undefined)
    return res.status(400).json({ message: "year & month are required" });

  const categories = await Category.find({ userId });
  const budgets = await Budget.find({ userId, year, month });

  const map = budgets.reduce((acc, b) => {
    acc[b.categoryId.toString()] = b;
    return acc;
  }, {});

  const result = categories.map((c) => {
    const b = map[c._id.toString()];
    return {
      categoryId: c._id,
      categoryName: c.name,
      color: c.color,
      limitCents: b ? b.limitCents : 0,
      budgetId: b ? b._id : null
    };
  });

  res.json(result);
};

export const createOrUpdateBudget = async (req, res) => {
  const userId = req.user.id;
  const { categoryId, year, month, limitCents } = req.body;

  if (!categoryId || year === undefined || month === undefined)
    return res.status(400).json({ message: "Missing fields" });

  const filter = { userId, categoryId, year, month }; 
  const update = { limitCents };
  const opts = { upsert: true, new: true };

  const budget = await Budget.findOneAndUpdate(filter, update, opts);
  res.json(budget);
};

export const deleteBudget = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  await Budget.deleteOne({ _id: id, userId });
  res.json({ message: "Deleted" });
};
