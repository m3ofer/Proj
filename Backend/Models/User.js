const bcrypt = require("bcrypt");
const mongoose =require("mongoose"); 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

},{timestamps : true}); 

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();  
    this.password=await bcrypt.hash(this.password,salt);
    next(); 
})
UserSchema.statics.login = async function(username,password){
    const user = await this.findOne({username}); 
    if(user){
        const auth = await bcrypt.compare(password,user.password); 
        if(auth)
            return user; 
        throw Error("incorrect password");  
    }
    throw Error("incorrect email"); 
}

module.exports = mongoose.model('User',UserSchema);