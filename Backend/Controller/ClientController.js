const Client = require("../Models/Client");
const User = require("../Models/User");



const AllClients_Get = (req,res)=>{
    Client.find().populate('user').then((result)=>{
        res.render("ClientsList",{clients : result});
    }).catch((err)=>{
        console.log(err);
    })
}

const AllClients_Service = async ()=>{
    return await Client.find()
}

const addClient = (req,res)=>{
    const user = new User({username : req.body.username,password : req.body.password});
    user.save().then(()=>{
        const c = new Client({macAddress: req.body.macAddress,user : user._id}).
        save().then(()=>{
            console.log("account and client added successfully!");
        });
    }).catch(()=>{
        console.log("error occured when trying to add new User!")
    });
}



module.exports={
    AllClients_Service,
    AllClients_Get,
    addClient
}