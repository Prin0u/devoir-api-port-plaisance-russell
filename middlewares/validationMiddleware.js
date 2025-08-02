/**
 * Middleware de validation pour les données utilisateur.
 * Personnalisable pour chaque type de ressource.
 *
 * @param {Array<string>} requiredFields - Champs requis à vérifier dans req.body
 * @returns {Function} Middleware Express
 */
function validateRequiredFields(requiredFields = []) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Champs manquants",
        missing: missingFields,
      });
    }

    next();
  };
}

module.exports = validateRequiredFields;
