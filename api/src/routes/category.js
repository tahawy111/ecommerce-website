const { requireSignin, adminMiddlewere } = require("../common-middlewere");
const {
  createCategory,
  getCategories,
} = require("../controller/category.controller");
const router = require("express").Router();

router.post("/category/create", requireSignin, adminMiddlewere, createCategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
