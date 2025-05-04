const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  owner_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle_number: {
    type: String,
    required: true,
    unique: true
  },
  vehicle_type: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  registration_certificate_url: {
    type: String,
    required: true
  },
  insurance_url: {
    type: String,
    required: true
  },
  is_available: {
    type: Boolean,
    default: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  last_updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index
AmbulanceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
