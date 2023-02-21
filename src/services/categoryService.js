const { Category } = require('../models');

const addCategory = async (name) => {
  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
 const allCategories = Category.findAll();
 return allCategories;
};

const getCategoryId = async (id) => {
  const categoryId = Category.findAll({ where: { id } });
  return categoryId;
};

module.exports = { addCategory, getAllCategories, getCategoryId };