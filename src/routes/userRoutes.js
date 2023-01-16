const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
router.post("/signUp", userController.signUp);
router.post("/updateuser/:userId?", userController.updateuser);
router.post("/login", userController.login);
router.get("/deleteUser", userController.deleteUser);
router.get("/findUser/:userId?", auth, userController.findUser);
router.get("/getAlluser", userController.getAlluser);
//router.get('/login',userController.login)
module.exports = router;
