const Page = require("../../models/Page");

exports.createPage = async (req, res) => {
  const { banners, products } = req.files;

  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `/${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type:${req.body.type}`,
    }));
  }

  if (products && products.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `/${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type:${req.body.type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  const newPage = new Page(req.body);

  try {
    const page = await newPage.save();
    return res.status(201).json({ page });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};
