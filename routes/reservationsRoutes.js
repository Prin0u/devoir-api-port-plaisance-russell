const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

/**
 * Créer une réservation
 */
router.post("/", reservationsController.createReservation);
/**
 * Lister toutes les réservations
 */

router.get("/", reservationsController.getAllReservations);
/**
 * Récupérer une réservation par son numéro
 */
router.get("/:id", reservationsController.getReservationById);
/**
 * Modifier une réservation
 */
router.put("/:id", reservationsController.updateReservation);
/**
 * Supprimer une réservation
 */
router.delete("/:id", reservationsController.deleteReservation);

module.exports = router;
