const Topic = require("../Models/Topic");
const Client = require("../Models/Client");

const getAllTopics = async (req,res)=>{
    return await Topic.find();
}

const addTopic = (req,res)=>{
    const topic = new Topic({ name : req.body.name,description : req.body.description}); 
    topic.save().then(()=>{
        res.status(200).json("topic added successfully !");
    }).catch((err)=>{
        res.status(400).json("error adding new topic please retry !");
    });
}
const removeTopic = (req,res)=>{
    Topic.findOneAndDelete({ name : req.params.name}).then((result)=>{
        res.status(200).json("topic deleted successfully");
    }).catch((err)=>{
        res.json(err);
    })
}
const allTopics = async (req,res)=>{
    Topic.find().then((result)=>{
        res.status(200).json(result);
    }).catch(()=>{
        res.status(400).json("error while trying to get All topics");
    })
}

module.exports={
    getAllTopics,
    addTopic,
    removeTopic,
    allTopics
}