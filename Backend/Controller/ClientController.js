const Client = require("../Models/Client");
const User = require("../Models/User");
const Topic = require("../Models/Topic");



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
    const user = new User({username : req.body.username,password : req.body.password,isAdmin : req.body.isAdmin});
    //console.log(user);
    user.save().then(()=>{
        let location = {
            longitude : req.body.location.longitude,
            latitude : req.body.location.latitude
        }
        const c = new Client({macAddress: req.body.macAddress,location,subscribedAt : req.body.subscribedAt,user : user._id}).
        save().then(()=>{
            console.log("account and client added successfully!");
        }).catch((err)=>{
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

module.exports={
    AllClients_Service,
    AllClients_Get,
    addClient,
    addTopicToClient,
    RemoveTopicFromClient
}