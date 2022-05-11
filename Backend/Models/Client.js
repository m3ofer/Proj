const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const ClientSchema = new Schema({
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
    ],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
},{timestamps : true})


module.exports = mongoose.model('Client',ClientSchema);