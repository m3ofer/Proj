const express= require("express"); 
const router=express.Router();
const topicController = require("../Controller/TopicController");


router.post("/add",topicController.addTopic);
router.get("/remove/:name",topicController.removeTopic)
router.get("/all",topicController.allTopics)

module.exports = router;