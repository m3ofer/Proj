const Info = require("../Models/Info");

const addInfo = (data)=>{
    const info = new Info({ temperature : data.temp,client : data.person});

    info.save().then(()=>{
        console.log("Information stored successfully");
    }).catch((err)=>{
        console.log(err);
    })
    
}

module.exports = {
    addInfo
}