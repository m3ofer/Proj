const express= require("express"); 
const router=express.Router();
const clientController = require("../Controller/ClientController");
const authMiddleware = require("../middleware/authMiddleware"); 


router.get("/clientsList",authMiddleware.CheckAuthorisation,clientController.AllClients_Get);
router.post("/addClient",authMiddleware.CheckAuthorisation,clientController.addClient)
router.post("/addTopicToClient",clientController.addTopicToClient)
router.post("/unsubscribe/:macAddress/:topic",clientController.RemoveTopicFromClient);

module.exports = router;