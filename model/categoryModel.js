import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  color: { type: String, default: "#60a5fa" },
  
}, { timestamps: true });

const Category= mongoose.model("Category", categorySchema);
export default Category