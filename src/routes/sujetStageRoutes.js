const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const sujetStageController = require("../controller/sujetStageController");

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
module.exports = router;
