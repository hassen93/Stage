const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
router.post("/signUp", userController.signUp);
router.post("/updateuser/:userId?", userController.updateuser);
router.post("/login", userController.login);
router.get("/deleteUser/:userId?", userController.deleteUser);
router.get("/findUser/:userId?", userController.findUser);
router.get("/getAlluser", userController.getAlluser);
router.get("/logout", auth, userController.logout);
router.get("/findUserByEmail/:email?", userController.findUserByEmail);
//router.get('/login',userController.login)
module.exports = router;
