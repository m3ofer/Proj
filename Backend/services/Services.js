const Info = require("../Models/Info");
const Client =require("../Models/Client");
const Topic = require("../Models/Topic");

async function find() {
    return await Client.findById("625f02bda63b39c97457605c");
}

async function getTopicsOfclient(client){
    const topics = await Topic.findById(client.subscribedAt[0]);
    return topics;
}

module.exports = {
    find,
    getTopicsOfclient
}