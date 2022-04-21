const Info = require("../Models/Info");
const Client =require("../Models/Client");
const Topic = require("../Models/Topic");

async function find(macAddress) {
    return await Client.findOne({ macAddress});
}

async function getTopicsOfclient(client){
    const topics = await Topic.findById(client.subscribedAt[0]);
    return topics;
}

async function getAllTopics() {
    return await Topic.find();
}

module.exports = {
    find,
    getTopicsOfclient,
    getAllTopics
}