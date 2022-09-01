const Cart = require("../models/Cart");

exports.addItemToCart = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.user._id });
  const { _id, price, name, qtyInStore } = req.body.cartItems;
  const newItem = {
    _id,
    price,
    priceOfOne: price,
    name,
    quantity: 1,
    qtyInStore,
  };
  if (!cart) {
    try {
      const _cart = new Cart({
        _id: req.user._id,
        totalQuantity: 1,
        totalPrice: price,
        cartItems: [newItem],
      });

      const cart = await _cart.save();

      res.status(201).json({ cart });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    const item = cart.cartItems.find((c) => c._id == _id);
    res.status(200).json({ item });
  }
};
