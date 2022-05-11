var express = require('express');
const mqtt = require("mqtt");
const mongoose = require("mongoose"); 
const { getClientByMacAddress , AllClients_Service,AllClients_Get} = require("./Controller/ClientController");
const { getAllTopics} = require("./Controller/TopicController");
const clientsRoute = require("./routes/ClientsRoute");
const usersRoute = require("./routes/UsersRoute");
const Info = require("./Models/Info");
const cookieParser = require("cookie-parser");

const authMiddleware = require("./middleware/authMiddleware"); 



var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine','ejs');
app.use(express.urlencoded({extended : true})); 
app.use(cookieParser()); 
app.use(express.json());



const dbURI = process.env.MongoURI;
mongoose.connect("mongodb+srv://nado:test123@cluster0.1yy0b.mongodb.net/IOT-project?retryWrites=true&w=majority",{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>{
    http.listen(3000,()=>{
        console.log("listen on 3000");
    });
        console.log("connected successfully")
    })
    .catch((err)=>console.log(err)); 




io.sockets.on('connection', function(socket) {
    console.log('Client connected...');

});

var client = mqtt.connect("mqtt://test.mosquitto.org");

var clients=null;


client.on('connect',async function () {
    clients = await AllClients_Service();
    const topics = await getAllTopics();
    topics.forEach(topic => {
        client.subscribe(topic.name); 
    });
    console.log("client subscribed successfully");
    client.on('message',function(topic,message){
        let data;
        try {
            data = JSON.parse(message.toString());
        } catch (error) {
            return; 
        }
        io.sockets.emit(data.person,message.toString());
        //storeData(message.toString(),topic);
    })
    
});

async function storeData(data,topic) { 
    try {
        data = JSON.parse(data);
    } catch (error) {
        return; 
    }
        
    let clientSubscribed = false;
    clients.forEach(c => {
        if(c.macAddress == data.person) 
        {
            clientSubscribed=true; 
            data.person=c._id;
            return;
        }
    });

    if(clientSubscribed)
    {
        const info = new Info({ temperature : data.temp,client : data.person});

        info.save().then(()=>{
            console.log("Information stored successfully");
        }).catch((err)=>{
            console.log(err);
        });
    }
    
}

app.get("/test/:macAddress",(req,res)=>{
    res.render("test",{macAddress : req.params.macAddress});
}); 



app.use("/clients",authMiddleware.CheckAuthorisation,clientsRoute);

app.use("/users",usersRoute);

app.get("/",(req,res)=>{
    res.render("home");
});
