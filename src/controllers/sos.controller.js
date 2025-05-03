const { createEmergencyRequest } = require('../services/sos.service');
const { uploadToCloudinary } = require('../middleware/upload');
const { findNearestAvailableAmbulance } = require("../services/ambulance.service");


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
