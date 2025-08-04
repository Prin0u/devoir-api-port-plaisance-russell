const express = require("express");
const router = express.Router();

/**
 * Route pour afficher la documentation API
 */
router.get("/", (req, res) => {
  res.render("docapi");
});

module.exports = router;
