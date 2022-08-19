const router = require("express").Router();
const {
  upload,
  requireSignin,
  adminMiddlewere,
} = require("../../common-middlewere");
const { createPage } = require("../../controller/admin/page.controller");

router.post(
  "/page/create",
  requireSignin,
  adminMiddlewere,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = router;
