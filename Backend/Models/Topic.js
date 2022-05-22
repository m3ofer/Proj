const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const TopicSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description: {
        type : String
    },
},{timestamps : true})

// TopicSchema.pre('findOneAndDelete', function() {
//     // Remove all the assignment docs that reference the removed person.
//     console.log(this.model('Client').subscribedAt+"-------------");
//     this.model('Client').subscribedAt = this.model('Client').subscribedAt.filter(data => data.topic.name != this.name);
//     next();
// });

module.exports = mongoose.model('Topic',TopicSchema);