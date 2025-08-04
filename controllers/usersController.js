const User = require("../models/User");
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

    req.flash("success", "Utilisateur créé avec succès !");
    res.redirect("/users");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
/**
 * Connexion d'un utilisateur
 */

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Requête reçue :", req.body);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }
    console.log("Utilisateur trouvé :", user);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Création du token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    // Envoi du token dans un cookie sécurisé

    res.cookie("token", token, {
      httpOnly: true,
    });

    // Authentification réussie
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
/**
 * Récupère tout les utilisateurs
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const messages = req.flash();
    res.render("users", {
      users,
      messages,
    });
  } catch (error) {
    console.error("Erreur dans getAllUsers :", error);
    res.status(500).send("Erreur serveur");
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
    const { username, role, password } = req.body;

    const updates = { username, role, password };

    // Si le mot de passe est modifié et non vide, hash de celui-ci
    if (password && password.trim() !== "") {
      updates.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findOneAndUpdate({ email }, updates, {
      new: true,
    }).select("-password");

    if (!user) {
      req.flash("error", "Utilisateur non trouvé");
      return res.redirect("/users");
    }

    req.flash("success", "Utilisateur modifié avec succès !");
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    req.flash("error", "Erreur serveur lors de la modification");
    res.redirect("/users");
  }
};

/**
 * Afficher le formulaire de modification d'un utilisateur par email
 */
exports.showEditForm = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.render("editUsers", { user, messages: req.flash() });
  } catch (error) {
    res.status(500).send("Erreur serveur");
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

    req.flash("success", "Utilisateur supprimé avec succès !");
    res.redirect("/users");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
