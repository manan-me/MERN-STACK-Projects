const express = require("express");
const {
  handleGetAllProducts,
  handleDeleteProduct,
  handleCreateProduct,
  handleUpdateProduct,
  handleGetSingleProduct,
  handleReview,
  handleDeleteReview,
  handleGetAllReviews,
} = require("../Controllers/productControllers");
const router = express.Router();
const { isAuthenticated, restrictTo } = require("../Middleware/auth");

router.get("/products", handleGetAllProducts);

router.post(
  "/admin/createProduct",
  isAuthenticated,
  restrictTo(["ADMIN"]),
  handleCreateProduct,
);

router
  .route("/admin/product/:id")
  .put(isAuthenticated, restrictTo(["ADMIN"]), handleUpdateProduct)
  .delete(isAuthenticated, restrictTo(["ADMIN"]), handleDeleteProduct);

router.get(
  "/product/:id",
  isAuthenticated,
  restrictTo(["ADMIN", "NORMAL"]),
  handleGetSingleProduct,
);

router.put("/review/:id", isAuthenticated, handleReview);

router.get("/reviews",handleGetAllReviews)
router.delete("/reviews",isAuthenticated,handleDeleteReview)

module.exports = router;
