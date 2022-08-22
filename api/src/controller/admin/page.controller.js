const Page = require("../../models/Page");

exports.createPage = async (req, res) => {
  const { banners, products } = req.files;

  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  if (products && products.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  const _page = await Page.findOne({ category: req.body.category });

  if (_page) {
    try {
      const page = await Page.findOneAndUpdate(
        { category: req.body.category },
        req.body
      );
      if (page) {
        res.status(201).json({ page });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    const newPage = new Page(req.body);

    try {
      const page = await newPage.save();
      return res.status(201).json({ page });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong" });
    }
  }
};

exports.getPage = async (req, res) => {
  const { category, type } = req.params;

  if (type === "page") {
    try {
      const page = await Page.findOne({ category });
      res.status(200).json({ page });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(400).json({ error: "The type of category is not (Page)" });
  }
};
