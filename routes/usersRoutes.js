const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

/**
 * Créer un utilisateur
 */
router.post("/", userController.createUser);

/**
 * Lister tous les utilisateurs
 */
router.get("/", userController.getAllUsers);

/**
 * Récupérer un utilisateur avec l'email
 */
router.get("/:email", userController.getUserByEmail);

/**
 * Modifier un utilisateur
 */
router.put("/:email", userController.updateUser);

/**
 * Supprimer un utilisateur
 */
router.delete("/:email", userController.deleteUser);

module.exports = router;
