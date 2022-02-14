const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;