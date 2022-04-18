const mqtt = require("mqtt");
const Info = require("./Models/Info");
const mongoose = require("mongoose");

const dbURI = "mongodb+srv://nado:test123@cluster0.1yy0b.mongodb.net/IOT-project?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>
    console.log("connected to db"))
    .catch((err)=>console.log(err)); 

var client = mqtt.connect("mqtt://test.mosquitto.org");
client.on('connect',function () {
    client.subscribe('Temp');
    console.log("client subscribed successfully");
});
client.on('message',function(topic,message){
    storeData(message.toString());
})


function storeData(data) {
     
    data = JSON.parse(data);
    console.log(data);
    const info = new Info({ temperature : data.temp,person : data.person});
   
    info.save().then(()=>{
        console.log("Information stored successfully");
    }).catch((err)=>{
        console.log(err);
    })
    
}