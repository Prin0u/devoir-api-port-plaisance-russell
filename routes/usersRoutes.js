const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const validateRequiredFields = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
/**
 * Créer un utilisateur (validation des champs requis)
 */
router.post(
  "/",
  validateRequiredFields(["username", "email", "password"]),
  userController.createUser
);

/**
 * Lister tous les utilisateurs (authentification obligatoire)
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * Récupérer un utilisateur avec l'email (authentification obligatoire)
 */
router.get("/:email", authMiddleware, userController.getUserByEmail);

/**
 * Modifier un utilisateur
 */
router.put("/:email", userController.updateUser);

/**
 * Supprimer un utilisateur (authentification obligatoire)
 */
router.delete("/:email", authMiddleware, userController.deleteUser);

module.exports = router;
