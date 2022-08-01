const Product = require("../models/Product");
const slugify = require("slugify");
const shortid = require("shortid");

exports.createProduct = async (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  } else {
    productPictures = [{ img: req.file.filename }];
  }
  const newProduct = new Product({
    name,
    slug: slugify(name),
    price,
    description,
    //     offer: { type: Number },
    productPictures,
    quantity,
    category: category ? category : [],
    //     reviews: [
    //       {
    //         userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    //         review: String,
    //       },
    //     ],
    createdBy: req.user._id,
  });
  try {
    const product = await newProduct.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.getProducts = async (req, res) => {
  const products = await Product.find().select(
    "_id name slug price quantity description productPictures category"
  );
  res.status(200).json({ products });
};
