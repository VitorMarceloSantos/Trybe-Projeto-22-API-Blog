const categoryService = require('../services/categoryService');
// const { createToken } = require('../Tokens/jsonWebToken');

const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await categoryService.addCategory(name);
    return res.status(201).json(category);
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const allCategory = await categoryService.getAllCategories();
    return res.status(200).json(allCategory);
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
};

module.exports = { addCategory, getAllCategory };