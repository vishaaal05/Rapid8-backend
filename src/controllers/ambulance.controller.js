const { getIO } = require("../socket/socket.service");
const ambulanceService = require("../services/ambulance.service");

exports.updateLocation = async (req, res) => {
  const { id, lat, lng } = req.body;

  if (!id || !lat || !lng) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const ambulance = await ambulanceService.updateAmbulanceLocation(id, lat, lng);

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

    res.json({ success: true, data: ambulance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createAmbulance = async (req, res) => {
  try {
    const ambulance = await ambulanceService.createAmbulance(req.body);
    res.status(201).json({ 
      success: true, 
      message: "Ambulance created successfully",
      data: ambulance
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message
    });
  }
};

exports.getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await ambulanceService.getAllAmbulances();
    res.status(200).json({
      success: true,
      data: ambulances
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getAmbulanceById = async (req, res) => {
  try {
    const ambulance = await ambulanceService.getAmbulanceById(req.params.id);
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
      message: err.message
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

    const nearestAmbulance = await ambulanceService.findNearestAvailableAmbulance(
      parseFloat(lat), 
      parseFloat(lng)
    );

    if (!nearestAmbulance) {
      return res.status(404).json({
        success: false,
        message: "No available ambulance found nearby"
      });
    }

    res.status(200).json({
      success: true,
      data: nearestAmbulance
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
