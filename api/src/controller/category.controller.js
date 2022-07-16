const slugify = require('slugify');
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const categoryObj = { name: req.body.name, slug: slugify(req.body.name) };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const newCat = new Category(categoryObj);

  try {
    const cat = await newCat.save();
    res.status(201).json({ cat });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ error });
  }
};
