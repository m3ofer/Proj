const Client = require("../Models/Client");
const User = require("../Models/User");
const Topic = require("../Models/Topic");

const mqtt = require("mqtt");


const AllClients_Get = (req,res)=>{
    Client.find().populate('user').then((result)=>{
        res.json(result);
    }).catch((err)=>{
        console.log(err);
    })
}

const AllClients_Service = async ()=>{
    return await Client.find().populate("subscribedAt.topic","name")
}
const addClient = (req,res)=>{
    const user = new User({
        username : req.body.username,
        password : req.body.password,
        isAdmin : req.body.isAdmin,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    });


    console.log(req.body.subscribedAt);
    user.save().then((result)=>{
        console.log(result+"---");
        let location = {
            longitude : req.body.longitude,
            latitude : req.body.latitude
        }
        let sub={
            topic:"625f02014e09ee323ffb2111",
            limit:38
        }
        console.log(result._id +"----")
        const c = new Client({macAddress: req.body.macAddress,location,subscribedAt : [sub],user : result._id}).
        save().then((result)=>{
            res.json(result);
            console.log("account and client added successfully!");
        }).catch((err)=>{
            res.json("error adding client");
            console.log(err+"------------------------------------------")
        });
        
    }).catch(()=>{
        console.log("error occured when trying to add new User!")
    });
    
}


const addTopicToClient = async (req,res)=>{
    const topic = Topic.findOne({name : req.body.name}).then(async (result)=>{
        console.log(result);
        const client = await Client.findOne({macAddress : req.body.macAddress})
            client.subscribedAt.push({topic : result._id,limit : req.body.limit});
            client.save();
            res.json(result);
    }).catch(()=>{
        res.status(400).json("error adding topic to client");
    })
    
}
const RemoveTopicFromClient = (req,res)=>{
    console.log(req.params.macAddress+"****")
    const client = Client.findOne({macAddress : req.params.macAddress}).populate("subscribedAt.topic","name").then((result)=>{
        
        result.subscribedAt = result.subscribedAt.filter(data => (data.topic != undefined) && (data.topic.name != req.params.topic));
        result.save();
        res.json(result);
    })       
}

const TopicsOfClient = (req,res)=>{
    Client.findOne({macAddress : req.params.macAddress}).populate("subscribedAt.topic","name").then((result)=>{
        res.status(200).json(result.subscribedAt);
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
const clientById = (req,res)=>{
    Client.findOne({_id : req.params.id}).populate('user').then((result)=>{
        res.json(result);
    }).catch((err)=>{
        res.json("no client founded");
        //console.log(err);
    })
}
const turnOffLed = (req,res)=>{
    let client = mqtt.connect("mqtt://test.mosquitto.org");
    console.log("TurnOF,led");
    client.publish("/swa/led",'off');
    res.status(200).json("led turned off");
}
module.exports={
    AllClients_Service,
    AllClients_Get,
    addClient,
    addTopicToClient,
    RemoveTopicFromClient,
    TopicsOfClient,
    clientById,turnOffLed
}