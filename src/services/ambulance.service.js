const Ambulance = require("../models/Ambulance");

exports.findNearestAvailableAmbulance = async (lat, lng) => {
  return await Ambulance.findOne({
    status: "available",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 10000 // 10 km
      }
    }
  });
};
