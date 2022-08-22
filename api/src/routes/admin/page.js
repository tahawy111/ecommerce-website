const router = require("express").Router();
const {
  upload,
  requireSignin,
  adminMiddlewere,
} = require("../../common-middlewere");
const {
  createPage,
  getPage,
} = require("../../controller/admin/page.controller");

router.post(
  "/page/create",
  requireSignin,
  adminMiddlewere,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);
router.get("/page/:category/:type", getPage);

module.exports = router;
