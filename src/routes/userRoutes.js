const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
router.post("/signUp", upload.array("image[]"), userController.signUp);
router.post(
  "/updateuser/:userId?",
  upload.array("image[]"),
  userController.updateuser
);
router.post("/login", upload.none(), userController.login);
router.get("/deleteUser/:userId?", userController.deleteUser);
router.get("/findUser/:userId?", userController.findUser);
router.get("/getAlluser", userController.getAlluser);
router.get(
  "/findUserByEmail/:email?",

  userController.findUserByEmail
);

//router.get('/login',userController.login)
module.exports = router;
