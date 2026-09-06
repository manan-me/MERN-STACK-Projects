const express = require("express");
const router = express.Router();
const {
  handleCreateListing,
  handleGetAllListings,
  handleGetListingById,
  handleUpdateListing,
  handleDeleteListing,
} = require("../Controllers/listingControllers");
const { Authorized } = require("../Middleware/auth");

router.post("/create", handleCreateListing);

module.exports = router;
