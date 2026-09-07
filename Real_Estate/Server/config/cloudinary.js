// config/cloudinary.js
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// avatar upload — square crop
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "manan-estate/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 300, height: 300, crop: "fill" }],
  },
})

// listing images — no crop, original size
const listingStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "manan-estate/listings",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
})

const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false)
    }
    cb(null, true)
  },
})

const uploadListingImages = multer({
  storage: listingStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB listing images
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false)
    }
    cb(null, true)
  },
})

module.exports = { cloudinary, uploadAvatar, uploadListingImages }