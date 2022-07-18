const Cart = require('../models/Cart');

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
          cart.cartItems[indexOfProduct].price +
          +req.body.cartItems.price * +req.body.cartItems.quantity;

        // Get Cart total quantity
        cart.totalQuantity += +req.body.cartItems.quantity;

        // Get Cart total price
        cart.totalPrice +=
          +req.body.cartItems.price * +req.body.cartItems.quantity;

        condition = { user: req.user._id, 'cartItems.product': product };
        action = { $set: cart };
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user._id, 'cartItems.product': product },
          {
            $set: cart,
          }
        );

        res.status(201).json({ cart: updatedCart });
      } else {
        // (Another Way To Update Cart)
        // if cart already exists then update cartItems array
        const { price, ...others } = req.body.cartItems;
        const lastPrice = +price * +req.body.cartItems.quantity;
        cart.totalPrice += +price * +req.body.cartItems.quantity;
        const cartItems = { price: lastPrice, singlePrice: +price, ...others };
        cart.totalQuantity += +req.body.cartItems.quantity;
        cart.cartItems = cart.cartItems.push(cartItems);
        condition = { user: req.user._id };
        action = { $set: cart };
        const updatedCart = await Cart.findOneAndUpdate(
          { user: req.user._id },
          { $set: cart }
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
      // const price = +req.body.cartItems.price;
      const { price, ...others } = req.body.cartItems;
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [
          {
            ...others,
            price: +price * +req.body.cartItems.quantity,
            singlePrice: +req.body.cartItems.price,
          },
        ],
        totalPrice: +price * +req.body.cartItems.quantity,
        totalQuantity: +req.body.cartItems.quantity,
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
