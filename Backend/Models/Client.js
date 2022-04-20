const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const ClientSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    macAddress : {
        type : String,
        required : true
    },
    location : {
        longitude : {
            type : String,
            //required : true
        },
        latitude : {
            type : String,
            //required : true
        }
    },
    subscribedAt : [
        {
            topic: {
                type: mongoose.Schema.Types.ObjectId,
                //required: true,
                ref: 'Topic',
            }
        } 
    ]
},{timestamps : true})


module.exports = mongoose.model('Client',ClientSchema);