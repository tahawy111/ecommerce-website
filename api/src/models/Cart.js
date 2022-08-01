const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
        singlePrice: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
