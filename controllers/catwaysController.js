const Catway = require("../models/catways");

/**
 * Lister tout les catways
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
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

    res.status(201).json({ message: "Catway créé", catway: newCatway });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Modifier l'état d'un catway
 */
exports.updateCatwayState = async (req, res) => {
  try {
    const catwayNumber = req.params.id;
    const { catwayState } = req.body;

    // Interdiction de modifier le numéro ou type de catway ici
    if (catwayType || catwayNumber) {
      return res.status(400).json({
        message: "Le numéro et le type du catway ne peuvent pas être modifiés",
      });
    }
    if (!catwayState) {
      return res.status(400).json({ message: "L'état du catway est requis" });
    }

    const catway = await Catway.findOneAndUpdate(
      { catwayNumber },
      { catwayState },
      { new: true }
    );

    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.json({ message: "Etat du catway mis à jour", catway });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * Supprimer un catway
 */
exports.deleteCatway = async (req, res) => {
  try {
    const catwayNumber = req.params.id;
    const catway = await Catway.findOneAndDelete({ catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
