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
 * Connexion d'un utilisateur
 */
router.post("/login", userController.loginUser);

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
 * Afficher le formulaire d'édition d'un utilisateur
 */
router.get("/:email/edit", authMiddleware, userController.showEditForm);

/**
 * Supprimer un utilisateur (authentification obligatoire)
 */
router.delete("/:email", authMiddleware, userController.deleteUser);

/**
 * Déconnexion d'un utilisateur
 */
router.post("/logout", (req, res) => {
  res.cookie("token", " ", { maxAge: 0, httpOnly: true });
  res.redirect("/");
});

module.exports = router;
