const { requireSignin, userMiddlewere } = require("../common-middlewere");
const {
  addItemToCart,
  getCartById,
  updateCartQty,
} = require("../controller/cart.controller");
const router = require("express").Router();

router.post(
  "/user/cart/add-to-cart",
  requireSignin,
  userMiddlewere,
  addItemToCart
);
router.get(
  "/user/cart/get-cart-by-id/:id",
  requireSignin,
  userMiddlewere,
  getCartById
);
router.put(
  "/user/cart/update-cart-quantity",
  requireSignin,
  userMiddlewere,
  updateCartQty
);

module.exports = router;
