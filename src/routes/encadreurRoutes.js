const express = require("express");
const router = express.Router();
const encadreurController = require("../controller/encadreurController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const upload = require("../middleware/upload");
router.post(
  "/addencadreur",
  upload.array("image[]"),
  encadreurController.addencadreur
);

router.post(
  "/updateencadreur/:encadreurId?",
  upload.array("image[]"),
  auth,
  // hasRole("admin"),
  encadreurController.updateencadreur
);

router.get(
  "/deleteencadreur/:encadreurId?",
  // auth,
  // hasRole("admin"),
  encadreurController.deleteencadreur
);

router.get(
  "/findencadreur/:encadreurId?",
  // auth,
  // hasRole("admin"),
  encadreurController.findencadreur
);
router.get(
  "/getAllencadreur",
  //auth,
  //hasRole("admin"),
  encadreurController.getAllencadreur
);
router.get(
  "/findencadreurByNom/:nom_encadreur?",
  //auth,
  //hasRole("admin"),
  encadreurController.findencadreurByNom
);
router.get(
  "/findencadreurByUserId/:userId?",
  //auth,
  //hasRole("admin"),
  encadreurController.findencadreurByUserId
);
module.exports = router;
