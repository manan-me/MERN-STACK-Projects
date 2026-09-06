const catchAsyncErrors=require("../Middleware/catchAsyncError")
const Listing=require("../Model/listing")
const ErrorHandler=require("../utils/errorHandler")
const handleCreateListing=catchAsyncErrors(async(req,res,next)=>{
    const listing=await Listing.create(req.body)
    res.status(201).json({
        success:true,
        listing
    })
})

module.exports={handleCreateListing}