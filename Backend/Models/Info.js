const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const InfoSchema = new Schema({
    temperature : {
        type : Number,
        required : true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
},{timestamps : true})


module.exports = mongoose.model('Info',InfoSchema);