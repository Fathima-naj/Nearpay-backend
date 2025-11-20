import Category from "../model/categoryModel.js";


export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    const userId = req.user.id;
    if (!name) return res.status(400).json({ message: "Name required" });

    const cat = await Category.create({ userId, name, color });
    res.status(201).json({ message: "Category created", category: cat });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getCategories = async (req, res) => {
  const userId = req.user.id;
  const cats = await Category.find({ userId }).sort("name");
  res.json(cats);
};

export const updateCategory = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, color } = req.body;
  const cat = await Category.findOneAndUpdate({ _id: id, userId }, { name, color }, { new: true });
  if (!cat) return res.status(404).json({ message: "Category not found" });
  res.json(cat);
};

export const deleteCategory = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  await Category.findOneAndDelete({ _id: id, userId });
  res.json({ message: "Deleted" });
};
