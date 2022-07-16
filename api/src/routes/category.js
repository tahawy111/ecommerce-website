const { requireSignin, adminMiddlewere } = require('../common-middlewere');
const {
  createCategory,
  getCategory,
} = require('../controller/category.controller');
const router = require('express').Router();

router.post('/category/create', requireSignin, adminMiddlewere, createCategory);
router.get('/category/getCategory', getCategory);

module.exports = router;
