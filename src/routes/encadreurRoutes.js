const express = require("express");
const router = express.Router();
const encadreurController = require("../controller/encadreurController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");

router.post(
  "/addencadreur",
  auth,
  hasRole("admin"),
  encadreurController.addencadreur
);

router.post(
  "/updateencadreur/:encadreurId?",
  auth,
  hasRole("admin"),
  encadreurController.updateencadreur
);

router.get(
  "/deleteencadreur",
  auth,
  hasRole("admin"),
  encadreurController.deleteencadreur
);

router.get(
  "/findencadreur/:encadreurId?",
  auth,
  hasRole("admin"),
  encadreurController.findencadreur
);
router.get(
  "/getAllencadreur",
  auth,
  hasRole("admin"),
  encadreurController.getAllencadreur
);
module.exports = router;
