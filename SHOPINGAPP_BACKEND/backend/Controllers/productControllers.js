const Product = require("../Model/productModel");
const ErrorHanlder = require("../utils/errorHandle");
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");

// Create Product --Admin
const handleCreateProduct = catchAsyncErrors(async (req, res,next) => {
  req.body.user=req.user.id
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products
const handleGetAllProducts = catchAsyncErrors(async (req, res,next) => {
    const resultPerPage=5
    const productCount=await Product.countDocuments()
  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const allProducts = await apiFeatures.query;
  return res.status(200).json({
    success: true,
    productCount,
    allProducts
  });
});

// Update Product --Admin
const handleUpdateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
  );
  if (!product) {
    return next(new ErrorHanlder("Product not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
const handleDeleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHanlder("Product not Found", 404));
  }
  return res.status(200).json({
    success: true,
    msg: "Product deleted",
  });
});

// Get Single Product
const handleGetSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHanlder("Product not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  handleGetAllProducts,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetSingleProduct,
};
