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
    c = await service.find();
    const t = await service.getTopicsOfclient(c);
    

    client.subscribe(t.name);
    console.log("client subscribed successfully");
});
client.on('message',function(topic,message){
    console.log(message.toString());
    storeData(message.toString(),c._id);
})



function storeData(data,person) {
     
    data = JSON.parse(data);
    console.log(data);
    const info = new Info({ temperature : data.temp,client : person});
   
    info.save().then(()=>{
        console.log("Information stored successfully");
    }).catch((err)=>{
        console.log(err);
    })
    
}