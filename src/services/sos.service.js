const EmergencyRequest = require('./../models/EmergencyRequest.js');

const createEmergencyRequest = async ({ name, condition, location, imageUrl }) => {
  const newRequest = new EmergencyRequest({
    name,
    condition,
    location,
    imageUrl,
  });

  return await newRequest.save();
};

module.exports = {
  createEmergencyRequest,
};
