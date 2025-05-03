const express = require("express");
const router = express.Router();
const { updateLocation, createAmbulance, getAllAmbulances, getAmbulanceById } = require("../controllers/ambulance.controller");

router.patch("/update-location", updateLocation);
router.post("/create", createAmbulance);
router.get("/", getAllAmbulances);
router.get("/:id", getAmbulanceById);

module.exports = router;
