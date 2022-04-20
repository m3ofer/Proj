const Info = require("./Models/Info");
const Client =require("./Models/Client");
const mongoose = require("mongoose");
const Topic = require("./Models/Topic");



const dbURI = "mongodb+srv://nado:test123@cluster0.1yy0b.mongodb.net/IOT-project?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser : true,useUnifiedTopology : true}).then((result)=>
    console.log("connected to db"))
    .catch((err)=>console.log(err)); 

    run();
async function run() {
    //  const t = await Topic.create({name : "humidity" , description : "test desc hum"});
    //  console.log(t);
    //const c = await Client.create({username :"smail" ,password : "123456",macAddress:"test"});
    //console.log(c);

    const c = await Client.find({subscribedAt : { _id :"625f05c3debcfeaf1b8d6ca0"}}).populate()
    
    console.log(c);
    // c.subscribedAt[0] = "625f02014e09ee323ffb2111";
    // c.save();
    // console.log(c);
    //625f02014e09ee323ffb2111


}


