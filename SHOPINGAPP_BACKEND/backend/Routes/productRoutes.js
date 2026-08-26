const express = require("express");
const {
  handleGetAllProducts,
  handleDeleteProduct,
  handleCreateProduct,
  handleUpdateProduct,
  handleGetSingleProduct,
} = require("../Controllers/productControllers");
const router = express.Router();

router.get("/products", handleGetAllProducts);

router.post("/createProduct", handleCreateProduct);

router
  .route("/product/:id")
  .put(handleUpdateProduct)
  .delete(handleDeleteProduct)
  .get(handleGetSingleProduct)

module.exports = router;
