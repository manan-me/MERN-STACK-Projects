const express = require("express");
const {
  handleGetAllProducts,
  handleDeleteProduct,
  handleCreateProduct,
  handleUpdateProduct,
  handleGetSingleProduct,
} = require("../Controllers/productControllers");
const router = express.Router();
const {isAuthenticated, restrictTo} =require ("../Middleware/auth")


router.get("/products", handleGetAllProducts);

router.post("/createProduct",isAuthenticated,restrictTo(['ADMIN']), handleCreateProduct);

router
  .route("/product/:id")
  .put(isAuthenticated,restrictTo(['ADMIN']),handleUpdateProduct)
  .delete(isAuthenticated,restrictTo(['ADMIN']),handleDeleteProduct)
  .get(isAuthenticated,restrictTo(['ADMIN',"NORMAL"]),handleGetSingleProduct)

module.exports = router;
