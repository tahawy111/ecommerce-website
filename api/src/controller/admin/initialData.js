const Category = require("../../models/Category");
const Product = require("../../models/Product");
const jwt = require("jsonwebtoken");

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

exports.initialData = async (req, res) => {
  const { token } = req.params;
  try {
    const vtoken = jwt.verify(token, process.env.JWT_SECRET);
    const categories = await Category.find();
    const products = await Product.find()
      .select(
        "_id name slug price quantity description productPictures category"
      )
      .populate({ path: "category", select: "_id name" });
    res.status(200).json({
      products,
      categories: createCategories(categories),
      logout: "Not Required",
    });
  } catch (error) {
    res.status(400).json({
      logout: "Required",
    });
  }
};
