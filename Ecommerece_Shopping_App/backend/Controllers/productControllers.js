const Product = require("../Model/productModel");
const ErrorHanlder = require("../utils/errorHandle");
const catchAsyncErrors = require("../Middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");

// Create Product --Admin
const handleCreateProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products
const handleGetAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const allProducts = await apiFeatures.query;
  return res.status(200).json({
    success: true,
    productCount,
    allProducts,
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

//Create new review or update review
const handleReview = catchAsyncErrors(async (req, res, next) => {
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };
  const product = await Product.findById(req.params.id);
  const isReviewd = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString(),
  );

  if (isReviewd) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(req.body.rating);
        rev.comment = req.body.comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = Number(avg / product.reviews.length);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//Get All reviews
const handleGetAllReviews=catchAsyncErrors(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHanlder("Product not Found", 404));
  }
  
  const reviews=product.reviews
  res.status(200).json({
    success: true,
    reviews
  });
  
})




//Delete a review
const handleDeleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHanlder("Product not Found", 404));
  }
  

    const reviews=product.reviews.filter(rev=>rev._id.toString()!==req.query.id.toString())

    let avg = 0;
  reviews.forEach((rev) => (avg += rev.rating));
  const numOfReviews=reviews.length
  const ratings = Number(avg / numOfReviews);

  await Product.findByIdAndUpdate(req.query.productId, {
  reviews,
  ratings,
  numOfReviews
}, { new: true });

  res.status(200).json({
    success: true,
    
  });



})


module.exports = {
  handleGetAllProducts,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetSingleProduct,
  handleReview,
  handleDeleteReview,
  handleGetAllReviews,
};
