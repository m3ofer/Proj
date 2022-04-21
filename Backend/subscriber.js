const mqtt = require("mqtt");
const Info = require("./Models/Info");
const mongoose = require("mongoose");
const service = require("./services/Services")

const dbURI = "mongodb+srv://nado:test123@cluster0.1yy0b.mongodb.net/IOT-project?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>
    console.log("connected to db"))
    .catch((err)=>console.log(err)); 

var client = mqtt.connect("mqtt://test.mosquitto.org");

var c=null; 

client.on('connect',async function () {
   
    const topics = await service.getAllTopics();
    topics.forEach(topic => {
        client.subscribe(topic.name);
    });
    console.log("client subscribed successfully");
});
client.on('message',function(topic,message){
    console.log(message.toString());
    storeData(message.toString(),topic);
})



async function storeData(data,topic) {
     
    data = JSON.parse(data);
    console.log(data);
    const client = await service.find(data.person);
    const info = new Info({ temperature : data.temp,client : client._id});
    
    info.save().then(()=>{
        console.log("Information stored successfully");
    }).catch((err)=>{
        console.log(err);
    })
    
}