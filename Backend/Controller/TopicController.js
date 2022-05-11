const Topic = require("../Models/Topic");

const getAllTopics = async (req,res)=>{
    return await Topic.find();
}

//const ad


module.exports={
    getAllTopics
}