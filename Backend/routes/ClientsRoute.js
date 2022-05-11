const express= require("express"); 
const router=express.Router();
const clientController = require("../Controller/ClientController");


router.get("/clientsList",clientController.AllClients_Get);



module.exports = router;