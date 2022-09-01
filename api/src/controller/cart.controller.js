const Cart = require("../models/Cart");

exports.addItemToCart = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.user._id });
  const { _id, price, name, img, qtyInStore } = req.body.cartItems;
  const newItem = {
    _id,
    price,
    priceOfOne: price,
    name,
    img,
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
    // if Cart is already exist

    // if item already exist in cartItems
    let indexOfItem = -1;
    for (let i = 0; i < cart.cartItems.length; i++) {
      if (_id === cart.cartItems[i]._id) {
        indexOfItem = i;
        break;
      }
    }

    // it means that item is exist then update data
    if (indexOfItem >= 0) {
      if (
        cart.cartItems[indexOfItem].quantity >=
        cart.cartItems[indexOfItem].qtyInStore
      ) {
        return res.status(400).json({
          message: "You can't increase product quantity over the maximum",
        });
      } else {
        try {
          cart.cartItems[indexOfItem].quantity += 1;
          cart.cartItems[indexOfItem].price += price;
          cart.totalQuantity += 1;
          cart.totalPrice += price;

          const updatedCart = await Cart.findByIdAndUpdate(req.user._id, cart, {
            new: true,
          });
          return res.status(200).json({ cart: updatedCart });
        } catch (error) {
          return res.status(400).json({ error });
        }
      }
    } else {
      // if i chosed another unique product
      console.log("if i chosed another unique product");
      cart.totalQuantity += 1;
      cart.totalPrice += price;
      cart.cartItems.push(newItem);

      const updatedCart = await Cart.findByIdAndUpdate(req.user._id, cart, {
        new: true,
      });
      return res.status(200).json({ cart: updatedCart });
    }
  }
};
