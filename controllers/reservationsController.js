const Reservation = require("../models/reservations");

/**
 * Créer une réservation
 */
exports.createReservation = async (req, res) => {
  try {
    const { clientName, boatName, catwayNumber, startDate, endDate } = req.body;

    if (!clientName || !boatName || !catwayNumber || !startDate || !endDate) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    const reservation = new Reservation({
      clientName,
      boatName,
      catwayNumber,
      startDate,
      endDate,
    });

    await reservation.save();
    req.flash("success", "Réservation créée avec succès !");
    res.redirect("/reservations");

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
    res.render("reservations", {
      reservations,
      messages: req.flash(),
    });
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
    req.flash("success", "Révervation modifié avec succès !");
    res.redirect("/reservations");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Afficher le formulaire d'édition d'une réservation
 */
exports.showEditReservationForm = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send("Réservation non trouvée");
    }
    res.render("editReservations", { reservation });
  } catch (error) {
    res.status(500).send("Erreur serveur");
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

    req.flash("success", "Réservation supprimée avec succès !");
    res.redirect("/reservations");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
