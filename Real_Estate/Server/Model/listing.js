const { Schema, model } = require("mongoose");
const listingSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter listing name"],
    },
    description: {
      type: String,
      required: [true, "Please enter listing description"],
    },
    address: {
      type: String,
      required: [true, "Please enter listing address"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please enter listing regular price"],
    },
    discountedPrice: {
      type: Number,
      required: [true, "Please enter listing discounted price"],
    },
    noOfBedrooms: {
      type: Number,
      required: [true, "Please enter number of bedrooms"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please enter number of bathrooms"],
    },
    furnished: {
      type: Boolean,
      required: [true, "Please enter if listing is furnished or not"],
    },
    parking: {
      type: Boolean,
      required: [true, "Please enter if listing has parking or not"],
    },
    type: {
      type: String,
      required: [true, "Please enter listing type"],
    },
    offer: {
      type: Boolean,
      required: [true, "Please enter if listing has offer or not"],
    },
    imageUrls: {
        type:Array,
        required:[true,"Please enter listing images"]   
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Listing = model("Listing", listingSchema);
module.exports = Listing;