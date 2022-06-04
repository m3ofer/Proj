const express= require("express"); 
const router=express.Router();
const clientController = require("../Controller/ClientController");
const authMiddleware = require("../middleware/authMiddleware"); 


router.get("/clientsList",authMiddleware.CheckAuthorisation,clientController.AllClients_Get);
router.post("/addClient",authMiddleware.CheckAuthorisation,clientController.addClient)
router.post("/addTopicToClient",authMiddleware.CheckAuthorisation,clientController.addTopicToClient)
router.post("/unsubscribe/:macAddress/:topic",authMiddleware.authRequire,clientController.RemoveTopicFromClient);
router.get("/topicsOfclient/:macAddress",authMiddleware.authRequire,clientController.TopicsOfClient)

module.exports = router;