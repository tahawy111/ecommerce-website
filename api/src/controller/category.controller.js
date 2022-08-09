const shortid = require("shortid");
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
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };

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
    res.status(201).json({ categoryList });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };

      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findByIdAndUpdate(
        _id[i],
        category,
        {
          new: true,
        }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  } else {
    const category = { name, type };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findByIdAndUpdate(_id, category, {
      new: true,
    });

    return res.status(201).json({ updatedCategory });
  }
};
exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategories = await Category.findByIdAndDelete(ids[i]._id);
    deletedCategories.push(deleteCategories);
  }
  if (deletedCategories.length === ids.length) {
    res.status(200).json({ message: "Categories Removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
