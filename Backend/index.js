var express = require('express');
const mqtt = require("mqtt");
const mongoose = require("mongoose"); 
const { getClientByMacAddress , AllClients_Service,AllClients_Get} = require("./Controller/ClientController");
const { getAllTopics} = require("./Controller/TopicController");
const clientsRoute = require("./routes/ClientsRoute");
const usersRoute = require("./routes/UsersRoute");
const topicsRoute = require("./routes/TopicRoute");
const Info = require("./Models/Info");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authMiddleware = require("./middleware/authMiddleware"); 



var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine','ejs');
app.use(express.urlencoded({extended : true})); 
app.use(cookieParser()); 
app.use(express.json());
app.use(cors())
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://e-healthfront.herokuapp.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/

const dbURI = process.env.MongoURI;
mongoose.connect("mongodb+srv://nado:test123@cluster0.1yy0b.mongodb.net/IOT-project?retryWrites=true&w=majority",{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>{
    http.listen(process.env.PORT || 4000,()=>{
        console.log("listen on 4000");
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

    // clients[0].subscribedAt.push("625f02014e09ee323ffb2111");
    // clients[0].save();
    console.log("client subscribed successfully");
    client.on('message',function(topic,message){
        let data;
        try {
            data = JSON.parse(message.toString());
        } catch (error) {
            return; 
        }
        
        //storeData(message.toString(),topic);
        let macAddress = "";
        let clientSubscribed = false;
        clients.forEach(c => { //chercher si le client est inscrit dans ce topic
            if(c.macAddress == data.person) 
            {
                console.log(c.subscribedAt[0].topic+"---Mac")
                let found = c.subscribedAt.find(t => t.topic.name == topic);
                console.log(found);
                if(found){
                    clientSubscribed=true; 
                    macAddress= data.person;
                    data.person=c._id;
                    if(Number(data.temp)>=38){
                        client.publish("/swa/led",'on');
                    }
                    return;
                }
                
            }
        });
        if(clientSubscribed)
        {
            console.log("data emited")
            io.sockets.emit(macAddress+topic,message.toString());
            storeData(data,topic);
        }

    })
    
});

async function storeData(data,topic) { 
    // try {
    //     data = JSON.parse(data);
    // } catch (error) {
    //     return; 
    // }
        
    // let clientSubscribed = false;
    // clients.forEach(c => {
    //     if(c.macAddress == data.person) 
    //     {
    //         clientSubscribed=true; 
    //         data.person=c._id;
    //         return;
    //     }
    // });

    // if(clientSubscribed)
    // {
        console.log(data.temp+":::::");
        const info = new Info({ temperature : data.temp,client : data.person,fromTopic : topic});

        info.save().then(()=>{
            console.log("Information stored successfully");
        }).catch((err)=>{
            console.log(err);
        });
    //}
    
}

app.get("/",(req,res)=>{
    res.render("Home");
});

app.get("/data/live/:macAddress/:topic",authMiddleware.CheckAuthorisation,(req,res)=>{
    res.render("test",{macAddress : req.params.macAddress,topic : req.params.topic});
}); 



app.use("/clients",clientsRoute);//authMiddleware.CheckAuthorisation,

app.use("/users",usersRoute);
app.use("/topics",authMiddleware.CheckAuthorisation,topicsRoute);




app.get("/dataIntervall",authMiddleware.authRequire,(req,res)=>{
    console.log("here");

    console.log(req.query.date1,"###",req.query.date2,"##",req.query.username,"##",req.query.topic);
    Info.find({ 
        topic : req.query.topic,
        createdAt: {
            $gte: Date.parse(req.query.date1), 
            $lt: Date.parse(req.query.date2)
        }
    }).populate({
        path : 'client',
        populate : {
          path : 'user'
        }
      }).then((result)=>{
        res.json(result.filter(data => (data.client.user != null) && (data.client.user.username == req.query.username) && (data.fromTopic == req.query.topic)))
    }).catch((err)=>{
        res.status(500).json("error check the format of tha date (yyyy-mm-dd)")
    })

    
})
///:topic/:username/
app.get("/data",authMiddleware.authRequire,(req,res)=>{
    console.log("/index/data",req.query)
    console.log("/index/datashit:",req.query.topic,"##",req.query.username);
    Info.find({ //query today up to tonight
        topic : req.query.topic
    }).populate({
        path : 'client',
        populate : {
          path : 'user'
        }
      }).then((result)=>{
        res.json(result.filter(data => (data.client.user != null) && (data.client.user.username == req.query.username) && (data.fromTopic == req.query.topic)))
    }).catch((err)=>{
        res.status(500).json("error check the format of tha date (yyyy-mm-dd)")
    })
    
})