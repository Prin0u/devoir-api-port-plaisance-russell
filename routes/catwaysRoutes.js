const express = require("express");
const router = express.Router();
const catwaysController = require("../controllers/catwaysController");
const validateRequiredFields = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Créer un nouveau catway (validation des champs requis)
 */
router.post(
  "/",
  authMiddleware,
  validateRequiredFields(["catwayNumber", "catwayState", "catwayType"]),
  catwaysController.createCatway
);

/**
 * Lister tous les catways (authentification obligatoire)
 */
router.get("/", authMiddleware, catwaysController.getAllCatways);

/**
 * Récupérer un catway par son numéro (authentification obligatoire)
 */
router.get("/:id", authMiddleware, catwaysController.getCatwayByNumber);

/**
 * Mettre à jour l'état d'un catway (authentification obligatoire + validation)
 */
router.put(
  "/:id",
  authMiddleware,
  validateRequiredFields(["catwayType", "catwayState"]),
  catwaysController.updateCatwayState
);

/**
 * Supprimer un catway (authentification obligatoire)
 */
router.delete("/:id", authMiddleware, catwaysController.deleteCatway);

/**
 * Afficher le formulaire de modification d'un catway
 */
router.get("/:id/edit", authMiddleware, catwaysController.showEditForm);

module.exports = router;
