const Product = require("../models/Product");
const slugify = require("slugify");
const shortid = require("shortid");
const Category = require("../models/Category");

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
  res.status(200).json(products);
};

exports.getProductsBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const category = await Category.findOne({ slug }).select("_id");
    if (category) {
      const products = await Product.find({ category: category._id });
      res.status(200).json({
        products,
        productsByPrice: {
          under5k: products.filter((product) => product.price <= 5000),
          under10k: products.filter(
            (product) => product.price >= 5000 && product.price <= 10000
          ),
          under15k: products.filter(
            (product) => product.price >= 10000 && product.price <= 15000
          ),
          under20k: products.filter(
            (product) => product.price >= 15000 && product.price <= 20000
          ),
          under30k: products.filter(
            (product) => product.price >= 20000 && product.price <= 30000
          ),
        },
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
