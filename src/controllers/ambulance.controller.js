const Ambulance = require("../models/Ambulance");
const { getIO } = require("../socket/socket.service");
const { findNearestAvailableAmbulance } = require("../services/ambulance.service");

exports.updateLocation = async (req, res) => {
  const { id, lat, lng } = req.body;

  if (!id || !lat || !lng) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const ambulance = await Ambulance.findByIdAndUpdate(id, 
      {
        location: {
          type: "Point",
          coordinates: [lng, lat]
        },
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!ambulance) {
      return res.status(404).json({ success: false, message: "Ambulance not found" });
    }

    // Emit location update through socket
    const io = getIO();
    io.to(`ambulance-${id}`).emit("location-update", {
      ambulanceId: id,
      location: { lat, lng },
      timestamp: new Date()
    });

    res.json({ success: true, message: "Location updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.createAmbulance = async (req, res) => {
  const { driverName, phone, location } = req.body;

  if (!driverName || !phone || !location) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields" 
    });
  }

  try {
    const ambulance = new Ambulance({
      driverName,
      phone,
      location: {
        type: "Point",
        coordinates: [location.lng,  location.lat]
      }
    });

    await ambulance.save();

    res.status(201).json({ 
      success: true, 
      message: "Ambulance created successfully",
      data: ambulance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: err.message 
    });
  }
};

exports.getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.status(200).json({
      success: true,
      data: ambulances
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

exports.getAmbulanceById = async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);
    if (!ambulance) {
      return res.status(404).json({
        success: false,
        message: "Ambulance not found"
      });
    }
    res.status(200).json({
      success: true,
      data: ambulance
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

exports.findNearest = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required query parameters"
      });
    }

    const nearestAmbulance = await findNearestAvailableAmbulance(parseFloat(lat), parseFloat(lng));

    if (!nearestAmbulance) {
      return res.status(404).json({
        success: false,
        message: "No available ambulance found nearby"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ambulanceId: nearestAmbulance._id,
        driverName: nearestAmbulance.driverName,
        phone: nearestAmbulance.phone,
        distance: nearestAmbulance.distance // if available from the query
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};
