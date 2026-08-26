const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Product Name"],
    trim: true,
  },
  descryption: {
    type: String,
    required: [true, "Please enter Product Descryption"],
  },
  price: {
    type: Number,
    required: [true, "Please enter Product Price"],
    maxLength: [8, "Price Cannot exceed 8 characters"],
  },
 
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product Stock"],
    maxLength: [4, "Stock Cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const products=model('products',productSchema)

module.exports=products