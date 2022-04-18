const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const InfoSchema = new Schema({
    temperature : {
        type : Number,
        required : true
    },
    person : {
        type : String
    }
},{timestamps : true})


module.exports = mongoose.model('Info',InfoSchema);