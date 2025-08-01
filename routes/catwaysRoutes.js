const express = require("express");
const router = express.Router();
const catwaysController = require("../controllers/catwaysController");

/**
 * Créer un nouveau catway
 */
router.post("/", catwaysController.createCatway);

/**
 * Lister tous les catways
 */
router.get("/", catwaysController.getAllCatways);

/**
 * Récupérer un catway par son numéro
 */
router.get("/:id", catwaysController.getCatwayByNumber);

/**
 * Mettre à jour l'état d'un catway
 */
router.put("/:id", catwaysController.updateCatwayState);

/**
 * Supprimer un catway
 */
router.delete("/:id", catwaysController.deleteCatway);

module.exports = router;
