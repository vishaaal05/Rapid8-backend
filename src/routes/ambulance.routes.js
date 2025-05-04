const express = require("express");
const router = express.Router();
const { updateLocation, createAmbulance, getAllAmbulances, getAmbulanceById, findNearest, getLatestLocation } = require("../controllers/ambulance.controller");

router.patch("/update-location", updateLocation);
router.post("/create", createAmbulance);
router.get("/", getAllAmbulances);
router.get("/nearest", findNearest);  // Move this BEFORE the :id route
router.get("/:id", getAmbulanceById);
router.get("/:id/location", getLatestLocation);

module.exports = router;
