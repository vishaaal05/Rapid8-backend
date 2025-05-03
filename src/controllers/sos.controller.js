const { createEmergencyRequest } = require('../services/sos.service');
const { uploadToCloudinary } = require('../middleware/upload');
const { findNearestAvailableAmbulance } = require("../services/ambulance.service");


const handleSOSRequest = async (req, res) => {
  try {
    console.log('Received SOS request:', req.body);
    console.log('File received:', req.file);

    const { name, condition, location, phone } = req.body;
    let imageUrl = null;

    // Validate required fields
    if (!name || !condition || !location || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { name, condition, location, phone }
      });
    }

    // Handle image upload if present
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file);
        console.log('Image uploaded successfully:', imageUrl);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // Continue without image if upload fails
        imageUrl = null;
      }
    }

    const newRequest = await createEmergencyRequest({
      name, 
      condition, 
      location, 
      imageUrl, 
      phone 
    });

    console.log('SOS request created successfully:', newRequest);

    res.status(201).json({
      success: true,
      message: 'SOS request created successfully',
      data: newRequest,
    });
  } catch (error) {
    console.error('SOS Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


const sendSOS = async (req, res) => {
  const { name, condition, location, phone } = req.body;
  const [lat, lng] = location.split(',').map(Number);

  const nearestAmbulance = await findNearestAvailableAmbulance(lat, lng);

  if (!nearestAmbulance) {
    return res.status(404).json({ success: false, message: "No ambulance nearby" });
  }

  // Optionally mark ambulance busy
  nearestAmbulance.status = 'busy';
  await nearestAmbulance.save();

  res.status(200).json({
    success: true,
    message: "Ambulance assigned",
    ambulanceId: nearestAmbulance._id,
    driver: nearestAmbulance.driverName,
    phone: nearestAmbulance.phone
  });
};


module.exports = {
  handleSOSRequest,
  sendSOS
};
