const express = require("express");
const router = express.Router();
const stagiaireController = require("../controller/StagiaireController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");

router.post(
  "/addstagiaire",
  // auth,
  // hasRole("admin"),
  stagiaireController.addStagiaire
);
router.get(
  "/deletestagiaire/:stagiaireId?",
  stagiaireController.deleteStagiaire
);
router.post(
  "/updatestagiaire/:stagiaireId?",
  stagiaireController.updateStagiaire
);
router.get("/findstagiaire/:stagiaireId?", stagiaireController.findStagiaire);
router.get(
  "/getAllstagiaire",
  //auth,
  //hasRole("admin"),
  stagiaireController.getAllstagiaire
);
router.get(
  "/findstagiaireByNom/:nom_stagiaire?",
  //auth,
  //hasRole("admin"),
  stagiaireController.findstagiaireByNom
);
module.exports = router;
