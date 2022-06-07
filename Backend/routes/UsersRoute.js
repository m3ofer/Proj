const express= require("express"); 
const router=express.Router();
const usersController = require("../Controller/UserController");


router.post("/login",usersController.checkUser);
router.get("/login",usersController.checkUser_Get);
router.get("/logout",usersController.logOut);
router.post("/register",usersController.addUser);


module.exports = router;