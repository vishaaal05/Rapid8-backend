const EmergencyRequest = require('./../models/EmergencyRequest.js');

const createEmergencyRequest = async ({ name, condition, location, imageUrl, phone }) => {
  const newRequest = new EmergencyRequest({
    name,
    condition,
    location,
    imageUrl,
    phone
  });

  return await newRequest.save();
};

module.exports = {
  createEmergencyRequest,
};
