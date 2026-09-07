const catchAsyncErrors=require("../Middleware/catchAsyncError")
const Listing=require("../Model/listing")
const handleCreateListing=catchAsyncErrors(async(req,res,next)=>{
 const listing = await Listing.create({
    ...req.body,
    userRef: req.user._id  
  })  
    res.status(201).json({
        success:true,
        listing
    })
})

const handleGetUserListings=catchAsyncErrors(async(req,res,next)=>{
  const listings = await Listing.find({ userRef: req.user._id }).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    listings
  })
})

const uploadImages=(req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" })
  res.json({ success: true, url: req.file.path })
}



module.exports={handleCreateListing,handleGetUserListings,uploadImages}