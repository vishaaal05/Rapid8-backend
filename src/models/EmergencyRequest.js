const mongoose = require('mongoose');

const EmergencyRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const EmergencyRequest = mongoose.model('EmergencyRequest', EmergencyRequestSchema);

module.exports = EmergencyRequest;
