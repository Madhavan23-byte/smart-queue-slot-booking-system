const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true
    },
    tokenNumber: {
      type: Number,
      required: true,
      unique: true
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"]
    },
    status: {
      type: String,
      enum: ["Waiting", "Called", "Completed", "Skipped", "Cancelled"],
      default: "Waiting"
    }
  },
  {
    timestamps: true
  }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;