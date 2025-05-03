const staffSchema = new mongoose.Schema({
  staff_id: {
    type: String,
    required: true,
  },
  hospital_id: {
    type: Object.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  role: {
    type: String,
    enum: ["DOCTOR", "NURSE", "ADMIN", "STAFF"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String, // For password hash
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HospitalStaff", staffSchema);
