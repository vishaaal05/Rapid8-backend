const { createEmergencyRequest } = require('../services/sos.service');

const handleSOSRequest = async (req, res) => {
  try {
    const { name, condition, location, imageUrl } = req.body;

    if (!name || !condition || !location || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const newRequest = await createEmergencyRequest({ name, condition, location, imageUrl });

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
    });
  }
};

module.exports = {
  handleSOSRequest,
};
