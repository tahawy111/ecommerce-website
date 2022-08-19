const router = require("express").Router();
const { upload } = require("../../common-middlewere");
const { createPage } = require("../../controller/admin/page.controller");

router.post(
  "/page/create",
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

module.exports = router;
