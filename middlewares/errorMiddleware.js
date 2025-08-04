/**
 * Middleware de gestion des erreurs.
 * Capture les erreurs survenues dans l'application et renvoie une réponse JSON.
 *
 * @param {Error} err - L'erreur attrapée
 * @param {Object} req - La requête HTTP
 * @param {Object} res - La réponse HTTP
 * @param {Function} next - Fonction pour passer au middleware suivant
 */
function errorMiddleware(err, req, res, next) {
  console.error(err.stack); // Pour debug en console

  res.status(err.status || 500).json({
    message: err.message || "Erreur interne du serveur",
  });
}

module.exports = errorMiddleware;
