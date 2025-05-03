const resourceSchema = new mongoose.Schema({
  resource_id: {
    type: String,
    required: true,
  },
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  icu_beds_available: {
    type: Number,
    default: 0,
  },
  general_beds_available: {
    type: Number,
    default: 0,
  },
  ventilators_available: {
    type: Number,
    default: 0,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HospitalResource", resourceSchema);
