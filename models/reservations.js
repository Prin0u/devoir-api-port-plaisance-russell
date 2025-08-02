const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Schéma Mongoose pour une réservation de catway.
 */
const reservationSchema = new Schema(
  {
    catwayNumber: {
      type: Number,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    boatName: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "La date de fin doit être postérieure à la date de début.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
