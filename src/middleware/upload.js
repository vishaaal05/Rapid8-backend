const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single('image');

// Wrapped upload middleware to handle errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

// Function to upload to cloudinary
const uploadToCloudinary = async (file) => {
  try {
    if (!file) throw new Error('No file provided');

    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString('base64');
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'blogify'
    });

    return result.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }
};

module.exports = {
  uploadMiddleware,
  uploadToCloudinary
};