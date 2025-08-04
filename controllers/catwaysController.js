const Catway = require("../models/catways");

/**
 * Lister tout les catways
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways", {
      catways,
      messages: req.flash(),
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Récupérer un catway par son numéro
 */
exports.getCatwayByNumber = async (req, res) => {
  try {
    const catwayNumber = req.params.id;
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Créer un nouveau catway
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    // Vérifier si le numéro du catway existe déjà
    const existingCatway = await Catway.findOne({ catwayNumber });
    if (existingCatway) {
      return res.status(409).json({ message: "Numéro de catway déjà utilisé" });
    }
    const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
    await newCatway.save();

    req.flash("success", "Catway créé avec succès !");
    res.redirect("/catways");
  } catch (error) {
    req.flash("error", "Erreur serveur");
    res.redirect("/catways");
  }
};

/**
 * Affiche le formulaire de modification d'un catway identifié par son ID.
 */
exports.showEditForm = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.status(404).send("Catway non trouvé");
    }
    return res.render("editCatways", { catway });
  } catch (error) {
    res.status(500).send("Erreur serveur");
  }
};

/**
 * Modifier l'état d'un catway
 */
exports.updateCatwayState = async (req, res) => {
  try {
    const catwayId = req.params.id;
    const { catwayType, catwayNumber, catwayState } = req.body;

    if (!catwayState) {
      return res.status(400).json({ message: "L'état du catway est requis" });
    }

    const catway = await Catway.findByIdAndUpdate(
      catwayId,
      { catwayState },
      { new: true }
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    const catways = await Catway.find();
    req.flash("success", "Catway modifié avec succès !");
    res.redirect("/catways");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprimer un catway
 */
exports.deleteCatway = async (req, res) => {
  try {
    const catwayId = req.params.id; // ObjectId en string
    const catway = await Catway.findByIdAndDelete(catwayId);

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    req.flash("success", "Catway supprimé avec succès !");
    res.redirect("/catways");
  } catch (error) {
    req.flash("error", "Erreur serveur");
    res.redirect("/catways");
  }
};
