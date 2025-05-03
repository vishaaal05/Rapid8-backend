const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  emergency_contact_number: {
    type: String,
    required: true,
  },
  specialization: {
    type: [String], // Array of specializations
    default: [],
  },
  total_beds: {
    type: Number,
    default: 0,
  },
  available_beds: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hospital", hospitalSchema);
