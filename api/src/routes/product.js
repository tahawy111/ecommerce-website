const { requireSignin, adminMiddlewere } = require("../common-middlewere");
const {
  createProduct,
  getProducts,
  getProductsBySlug,
} = require("../controller/product.controller");
const router = require("express").Router();
const shortid = require("shortid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname.trim()}`);
  },
});

const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddlewere,
  upload.array("productPicture"),
  createProduct
);
router.get("/product/getProducts", requireSignin, adminMiddlewere, getProducts);
router.get("/products/:slug", getProductsBySlug);

module.exports = router;
