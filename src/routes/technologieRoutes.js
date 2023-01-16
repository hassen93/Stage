const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const technologieController = require("../controller/technologieController");

router.post(
  "/addtechnologie",
  auth,
  hasRole("admin"),
  technologieController.addtechnologie
);
router.get(
  "/findtechnologie/:technologieId?",
  auth,
  hasRole("admin"),
  technologieController.findtechnologie
);
router.get(
  "/deletetechnologie",
  auth,
  hasRole("admin"),
  technologieController.deletetechnologie
);
router.post(
  "/updatetechnologie/:technologieId?",
  auth,
  hasRole("admin"),
  technologieController.updatetechnologie
);
router.get(
  "/getAlltechnologie",
  auth,
  hasRole("admin"),
  technologieController.getAlltechnologie
);
module.exports = router;
