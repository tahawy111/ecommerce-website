const { requireSignin, adminMiddlewere } = require("../common-middlewere");
const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category.controller");
const router = require("express").Router();

const shortid = require("shortid");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignin,
  adminMiddlewere,
  upload.single("categoryImage"),
  createCategory
);
router.get("/category/getCategory", getCategories);
router.post(
  "/category/update",
  requireSignin,
  adminMiddlewere,
  upload.array("categoryImage"),
  updateCategories
);
router.post(
  "/category/delete",
  requireSignin,
  adminMiddlewere,
  deleteCategories
);

module.exports = router;
