const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const technologieController = require("../controller/technologieController");
const upload = require("../middleware/upload");
router.post(
  "/addtechnologie",
  upload.array("image[]"),
  //auth,
  //hasRole("admin"),
  technologieController.addtechnologie
);
router.get(
  "/findtechnologieById/:technologieId?",
  //auth,
  //hasRole("admin"),
  technologieController.findtechnologieById
);
router.get(
  "/deletetechnologie/:technologieId?",
  //auth,
  //hasRole("admin"),
  technologieController.deletetechnologie
);
router.post(
  "/updatetechnologie/:technologieId?",
  upload.array("image[]"),
  // auth,
  //hasRole("admin"),
  technologieController.updatetechnologie
);
router.get(
  "/getAlltechnologie",
  auth,
  hasRole("admin"),
  technologieController.getAlltechnologie
);
router.get(
  "/findtechnologieByNom/:nom_technologie?",
  //auth,
  //hasRole("admin"),
  technologieController.findtechnologieByNom
);
module.exports = router;
