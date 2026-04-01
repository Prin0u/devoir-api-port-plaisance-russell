const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Créer une réservation
 */
router.post("/", authMiddleware, reservationsController.createReservation);

/**
 * Lister toutes les réservations
 */

router.get("/", authMiddleware, reservationsController.getAllReservations);

/**
 * Formulaire de mofification d'une réservation
 */
router.get(
  "/:id/edit",
  authMiddleware,
  reservationsController.showEditReservationForm
);

/**
 * Récupérer une réservation par son numéro
 */
router.get("/:id", authMiddleware, reservationsController.getReservationById);

/**
 * Modifier une réservation
 */
router.put("/:id", authMiddleware, reservationsController.updateReservation);

/**
 * Supprimer une réservation
 */
router.delete("/:id", authMiddleware, reservationsController.deleteReservation);

module.exports = router;
