const jwt = require("jsonwebtoken");

/**
 * Middleware pour vérifier si l'utilisateur est connecté avec un token JWT.
 * @param {Object} req - La requête HTTP
 * @param {Object} res - La réponse HTTP
 * @param {Function} next - Passe au middleware suivant
 */
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On stocke les infos de l'utiisateur dans la requête
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
}

module.exports = authMiddleware;
