const express = require("express");
const router = express.Router();
const {
  handleCreateListing,
  handleGetUserListings,
  uploadImages,
} = require("../Controllers/listingControllers");
const { Authorized } = require("../Middleware/auth");

const { uploadListingImages } = require("../config/cloudinary");

router.post(
  "/upload-image",
  Authorized,
  uploadListingImages.single("image"),uploadImages);

router.post("/create",Authorized, handleCreateListing);
router.get("/user", Authorized, handleGetUserListings);

module.exports = router;
