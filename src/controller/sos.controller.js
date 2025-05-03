const { createEmergencyRequest } = require('../services/sos.service');
const { uploadToCloudinary } = require('../middleware/upload');

const handleSOSRequest = async (req, res) => {
  try {
    const { name, condition, location, phone } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Location is required',
      });
    }

    const newRequest = await createEmergencyRequest({ 
      name, 
      condition, 
      location, 
      imageUrl, 
      phone 
    });

    res.status(201).json({
      success: true,
      message: 'SOS request created successfully',
      data: newRequest,
    });
  } catch (error) {
    console.error('SOS Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};

module.exports = {
  handleSOSRequest,
};
