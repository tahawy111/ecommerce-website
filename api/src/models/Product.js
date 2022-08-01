const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    offer: { type: Number },
    productPictures: [
      {
        img: { type: String },
      },
    ],
    quantity: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorie',
      required: true,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        review: String,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
