const express = require("express");
const router = express.Router();
const universiteController = require("../controller/universiteController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const upload = require("../middleware/upload");

router.post(
  "/adduniversite",
  upload.array("image[]"),
  //auth,
  //hasRole("admin"),
  universiteController.adduniversite
);
router.post(
  "/updateuniversite/:universiteId?",
  universiteController.updateduniversite
);
router.get(
  "/deleteuniversite/:universiteId?",
  // auth,
  //hasRole("admin"),
  universiteController.deleteuniversite
);

router.get(
  "/finduniversiteById/:universiteId?",
  //auth,
  //hasRole("admin"),
  universiteController.finduniversite
);
router.get(
  "/getAlluniversite",
  //auth,
  //hasRole("admin"),
  universiteController.getAlluniversite
);
router.get(
  "/finduniversiteByNom/:nom_universite?",
  //auth,
  //hasRole("admin"),
  universiteController.finduniversiteByNom
);
module.exports = router;
