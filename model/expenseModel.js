import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  amountCents: { type: Number, required: true },
  date: { type: Date, required: true },
  note: String,
}, { timestamps: true });

const Expense=mongoose.model("Expense", expenseSchema);
export default Expense;
