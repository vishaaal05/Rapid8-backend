const express = require("express");
const router = express.Router();
const { updateLocation, createAmbulance } = require("../controllers/ambulance.controller");

router.patch("/update-location", updateLocation);
router.post("/create", createAmbulance);

module.exports = router;
