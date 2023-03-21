const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const sujetStageController = require("../controller/sujetStageController");
const upload = require("../middleware/upload");
router.post(
  "/addsujetStage",
  //auth,
  //hasRole("admin"),
  sujetStageController.addsujetStage
);
router.get(
  "/findsujetStage/:sujetStageId?",
  //auth,
  //hasRole("admin"),
  sujetStageController.findsujetStage
);
router.get(
  "/deletesujetStage/:sujetStageId?",
  //auth,
  //hasRole("admin"),
  sujetStageController.deletesujetStage
);
router.post(
  "/updatesujetStage/:sujetStageId?",
  //auth,
  //hasRole("admin"),
  sujetStageController.updatesujetStage
);
router.get(
  "/findsujetStage/:sujetStageId?",
  //auth,
  //hasRole("admin"),
  sujetStageController.findsujetStage
);
router.get(
  "/getAllsujetStage",
  //auth,
  // hasRole("admin"),
  sujetStageController.getAllsujetStage
);
router.get(
  "/findsujetStageByNom/:nom_sujetStage?",
  //auth,
  //hasRole("admin"),
  sujetStageController.findsujetStageByNom
);
router.post(
  "/updateTechnologiesOfSujetStage/:sujetStageId?",
  upload.none(),
  //auth,
  //hasRole("admin"),
  sujetStageController.updateTechnologiesOfSujetStage
);
router.post(
  "/updateEncadreursOfSujetStage/:sujetStageId?",
  upload.none(),
  //auth,
  //hasRole("admin"),
  sujetStageController.updateEncadreursOfSujetStage
);
router.post(
  "/updateStagiairesOfSujetStage/:sujetStageId?",
  upload.none(),
  //auth,
  //hasRole("admin"),
  sujetStageController.updateStagiairesOfSujetStage
);
module.exports = router;
