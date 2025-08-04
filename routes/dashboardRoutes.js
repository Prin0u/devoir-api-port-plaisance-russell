const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Reservation = require("../models/reservations");

/**
 * Affiche le tableau de bord des réservations en cours
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      endDate: { $gte: new Date() },
    });

    const currentDate = new Date().toLocaleDateString("fr-FR");

    res.render("dashboard", {
      user: req.user,
      reservations,
      currentDate,
    });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
});
module.exports = router;
