const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  driverName: String,
  phone: String,
  status: {
    type: String,
    enum: ['available', 'busy'],
    default: 'available'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

AmbulanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
