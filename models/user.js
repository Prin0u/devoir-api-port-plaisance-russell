const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Schéma Mongoose pour un utilisateur de la capitainerie.
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Email invalide"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    role: {
      type: String,
      enum: ["utilisateur", "admin"],
      default: "utilisateur",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
