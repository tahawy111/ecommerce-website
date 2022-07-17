const { requireSignin, userMiddlewere } = require('../common-middlewere');
const { addItemToCart } = require('../controller/cart.controller');
const router = require('express').Router();

router.post(
  '/user/cart/add-to-cart',
  requireSignin,
  userMiddlewere,
  addItemToCart
);
router.get('/category/getCategory');

module.exports = router;
