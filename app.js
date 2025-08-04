/**
 * Création de l'application Express du port de plaisance Russell avec configuration des middlewares,
 * connexion à la base de données MongoDB, au moteur de template EJS et aux routes principales.
 *
 * @module app
 */

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

dotenv.config();

const app = express();

/**
 * Middleware pour simuler PUT et DELETE dans les formulaires HTML
 */
app.use(methodOverride("_method"));

/**
 * Middleware pour gérer les sessions et les messages flash
 */
app.use(
  session({
    secret: "tonSecretUltraSecret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

/**
 * Import des routes
 */
const userRoutes = require("./routes/usersRoutes");
const catwaysRoutes = require("./routes/catwaysRoutes");
const reservationsRoutes = require("./routes/reservationsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
/**
 *  Middleware pour gérer les CORS (Cross-Origin Resource Sharing).
 */
app.use(cors());

/**
 * Middleware pour analyser et convertir les requêtes en JSON.
 */
app.use(express.json());

/**
 * Middleware pour analyser les données url-encoded.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware pour logger les requêtes HTTP en mode 'dev'.
 */
app.use(morgan("dev"));
/**
 * Middleware pour stocker le token dans un cookie
 */
app.use(cookieParser());
/**
 * Configuration du moteur de vues EJS.
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/**
 * Middleware pour servir les fichiers statiques du dossier 'public'.
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * Connexion à la base de données MongoDB.
 */
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connecté !"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

/**
 * Liaison des routes API
 */
app.use("/users", userRoutes);
app.use("/catways", catwaysRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/", dashboardRoutes);

/**
 * Route d'accueil : affiche la page d'accueil avec le moteur de vues EJS
 *
 * @name GET /
 * @function
 * @param {Object} req - L'objet requête HTTP
 * @param {Object} res - L'objet réponse HTTP
 */
app.get("/", (req, res) => {
  res.render("index", { title: "Port de plaisance Russell" });
});

// -------------------- GESTION DES ERREURS --------------------

/**
 * Middleware pour gérer les erreurs 404 (page non trouvée).
 * Ce middleware doit être placé après toutes les routes.
 * @param {Object} req - Requête HTTP non prise en charge.
 * @param {Object} res - Réponse HTTP.
 */
app.use((req, res) => {
  res.status(404).render("404", { title: "Page non trouvée" });
});

/**
 * Middleware global pour la gestion des erreurs côté serveur.
 * Ce middleware capture toutes les erreurs passées via next(err).
 * @param {Error} err - Objet erreur capturé.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 */
app.use(errorMiddleware);

/**
 * Export du module app pour utilisation dans server.js.
 */
module.exports = app;
