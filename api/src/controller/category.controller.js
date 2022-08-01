const slugify = require("slugify");
const Category = require("../models/Category");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      children: createCategories(categories, cat._id),
    });
  }
  return categoryList;
}

exports.createCategory = async (req, res) => {
  const categoryObj = { name: req.body.name, slug: slugify(req.body.name) };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  if (req.file) {
    categoryObj.categoryImage = `${process.env.API}/public/${req.file.filename}`;
  }

  const newCat = new Category(categoryObj);

  try {
    const cat = await newCat.save();
    res.status(201).json({ cat });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const categoryList = createCategories(categories);
    res.status(200).json({ categoryList });
  } catch (error) {
    res.status(400).json({ error });
  }
};
