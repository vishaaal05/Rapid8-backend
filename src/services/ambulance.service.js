const Ambulance = require("../models/Ambulance");

exports.findNearestAvailableAmbulance = async (lat, lng) => {
  return await Ambulance.findOne({
    is_available: true,
    is_active: true,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 10000 // 10 km
      }
    }
  }).populate('owner_user_id', 'name phone');
};

exports.updateAmbulanceLocation = async (id, lat, lng) => {
  return await Ambulance.findByIdAndUpdate(
    id,
    {
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      last_updated_at: new Date()
    },
    { new: true }
  );
};

exports.createAmbulance = async (ambulanceData) => {
  const ambulance = new Ambulance({
    ...ambulanceData,
    location: {
      type: "Point",
      coordinates: [ambulanceData.longitude, ambulanceData.latitude]
    }
  });
  return await ambulance.save();
};

exports.getAmbulanceById = async (id) => {
  return await Ambulance.findById(id).populate('owner_user_id', 'name phone');
};

exports.getAllAmbulances = async () => {
  return await Ambulance.find().populate('owner_user_id', 'name phone');
};

exports.getAmbulanceLatestLocation = async (ambulanceId) => {
  const ambulance = await Ambulance.findById(ambulanceId)
    .select('location last_updated_at vehicle_number is_available is_active')
    .lean();
  
  if (!ambulance) throw new Error('Ambulance not found');

  return {
    ambulanceId,
    location: {
      lat: ambulance.location.coordinates[1],
      lng: ambulance.location.coordinates[0]
    },
    last_updated_at: ambulance.last_updated_at,
    vehicle_number: ambulance.vehicle_number,
    is_available: ambulance.is_available,
    is_active: ambulance.is_active
  };
};
