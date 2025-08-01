const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Créer un utilisateur
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérification du mail si déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupère tout les utilisateurs
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Commande pour ne pas renvoyer les mots de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupérer un utilisateur
 */
exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur trouvé", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Modifier un utilisateur
 */
exports.updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const updates = req.body;

    // Si modification du mot de passe = hash de celui-ci
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findOneAndUpdate({ email }, updates, {
      new: true,
    }).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur modifié", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprimer un utilisateur
 */
exports.deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOneAndDelete({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
