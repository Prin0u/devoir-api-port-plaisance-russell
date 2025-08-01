const Reservation = require("../models/reservations");

/**
 * Créer une réservation
 */
exports.createReservation = async (req, res) => {
  try {
    const { userEmail, catwayNumber, startDate, endDate } = req.body;

    if (!userEmail || !catwayNumber || !startDate || !endDate) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const reservation = new Reservation({
      userEmail,
      catwayNumber,
      startDate,
      endDate,
    });

    await reservation.save();

    res.status(201).json({ message: "Réservation créée", reservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Lister toutes les réservations
 */
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupérer les détails d'une réservation en particulier
 */
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Modifier une réservation
 */
exports.updateReservation = async (req, res) => {
  try {
    const updates = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json({ message: "Réservation modifiée", reservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprimer une réservation
 */
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
