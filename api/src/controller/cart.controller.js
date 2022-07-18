const Cart = require("../models/Cart");

exports.addItemToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, action;

      if (item) {
        // if cart already exists then update quantity
        const indexOfProduct = cart.cartItems.indexOf(item);

        // update quantity
        cart.cartItems[indexOfProduct].quantity =
          cart.cartItems[indexOfProduct].quantity +
          +req.body.cartItems.quantity;

        // update price
        cart.cartItems[indexOfProduct].price =
          cart.cartItems[indexOfProduct].price + +req.body.cartItems.price;

        // Get Cart total price
        let totalPrice = 0;
        cart.totalPrice = 0;
        cart.cartItems.forEach((e) => {
          totalPrice += e.price;
        });

        cart.totalPrice = totalPrice;

        condition = { user: req.user._id, "cartItems.product": product };
        action = { $set: cart };
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: cart,
          }
        );

        res.status(201).json({ cart: updatedCart });
      } else {
        // (Another Way To Update Cart)
        // if cart already exists then update cartItems array
        let totalPrice = 0;
        cart.totalPrice = 0;
        cart.cartItems.forEach((e) => {
          totalPrice += e.price;
        });

        cart.totalPrice = totalPrice - item.price;
        cart.cartItems = cart.cartItems.push(req.body.cartItems);
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $set: cart,
          }
        );

        // if cart already exists then update cartItems array
        // const updatedCart = await Cart.findOneAndUpdate(
        //   { user: req.user._id },
        //   {
        //     $push: {
        //       cartItems: req.body.cartItems,
        //     },
        //   }
        // );

        res.status(201).json({ cart: updatedCart });
      }
    } else {
      // if cart not exist then create a new cart

      const newCart = new Cart({
        user: req.user._id,
        cartItems: [
          { ...req.body.cartItems, singlePrice: +req.body.cartItems.price },
        ],
        totalPrice: +req.body.cartItems.price,
      });

      try {
        const cart = await newCart.save();
        return res.status(201).json({ cart });
      } catch (error) {
        return res.status(400).json({ error });
      }
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
