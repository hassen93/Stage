const express = require("express");
const router = express.Router();
const stagiaireController = require("../controller/StagiaireController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");

router.post(
  "/addstagiaire",
  auth,
  hasRole("admin"),
  stagiaireController.addStagiaire
);
router.get("/deletestagiaire", stagiaireController.deleteStagiaire);
router.post(
  "/updatestagiaire/:stagiaireId?",
  stagiaireController.updateStagiaire
);
router.get("/findstagiaire/:stagiaireId?", stagiaireController.findStagiaire);
router.get(
  "/getAllstagiaire",
  auth,
  hasRole("admin"),
  stagiaireController.getAllstagiaire
);
module.exports = router;
