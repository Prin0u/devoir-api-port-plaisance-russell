const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Schéma Mongoose pour un catway (passerelle d'amarrage).
 */
const catwaySchema = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    catwayType: {
      type: String,
      required: true,
      enum: ["long", "moyen", "petit"],
    },
    catwayState: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catway", catwaySchema);
