const mongoose = require("mongoose");

const ambulanceSchema = new mongoose.Schema(
  {
    registration_no: {
      type: String,
      required: true,
      unique: true,
    },
    driver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver", // Assuming you have a Driver model
    },
    hospital_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "ON_DUTY", "MAINTENANCE", "ON_THE_WAY"],
      default: "AVAILABLE",
    },
    current_location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    is_equipped: {
      type: Boolean,
      default: true,
    },
    last_maintenance: {
      type: Date,
    },
    vehicle_type: {
      type: String,
      enum: ["BASIC", "ADVANCED", "ICU", "NEONATAL"],
      default: "BASIC",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Create geospatial index for location queries
ambulanceSchema.index({ current_location: "2dsphere" });

module.exports = mongoose.model("Ambulance", ambulanceSchema);
