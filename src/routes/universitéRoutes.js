const express = require("express");
const router = express.Router();
const universitéController = require("../controller/universitéController");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");

router.post(
  "/adduniversite",
  auth,
  hasRole("admin"),
  universitéController.adduniversité
);
router.post(
  "/updateuniversite/:universiteId?",
  universitéController.updateduniversité
);
router.get(
  "/deleteuniversite",
  auth,
  hasRole("admin"),
  universitéController.deleteuniversité
);

router.get(
  "/finduniversite/:universiteId?",
  auth,
  hasRole("admin"),
  universitéController.finduniversité
);
router.get(
  "/getAlluniversite",
  auth,
  hasRole("admin"),
  universitéController.getAlluniversité
);
module.exports = router;
