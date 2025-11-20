import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true }, 
  limitCents: { type: Number, default: 0 },
}, { timestamps: true });

budgetSchema.index({ userId:1, categoryId:1, year:1, month:1 }, { unique: true });

const Budget= mongoose.model("Budget", budgetSchema);
export default Budget