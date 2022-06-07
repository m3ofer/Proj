const jwt = require("jsonwebtoken");
const User = require("../Models/User");

function errorHandler(err){
    console.log("*****************************"+err.message+err.code+"******************************************"); 
    let errors = {username : "" , password :""}
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(error =>{
            errors[error.path]=error.message; 
        }) 
    }else if(err.code==11000){
        errors['username']= "this username has already linked to an account"; 
    }
    else if(err.message.includes("incorrect password"))
        errors["password"]="incorrect password";
    else 
        errors["username"]="incorrect email";
    return errors;
}


const addUser = (req,res)=>{
    const user = new User({
        firstName : req.body.firsName,
        lastName : req.body.lastName,
        username : req.body.username,
        password : req.body.password,
        isAdmin :  req.body.isAdmin
    }); 
    user.save().then(()=>{
        const token = createToken(user._id);
        res.cookie("jwt",token,{ httpOnly : true, maxAge : maxAge}); 
        res.status(200).json({user : user._id});
    }).catch((err)=>{
        let errors = errorHandler(err);
        res.status(400).json(errors);
    })
}

const checkUser= async (req,res) => {
    
    const username= req.body.username; 
    const passwordUser = req.body.password; 
    console.log(username+"-------------------------------------------shit"+passwordUser);
    try {
        const user = await User.login(username,passwordUser); 
        const token =createToken(user._id);
        res.cookie("jwt",token,{httpOnly : true,maxAge : maxAge*1000});
        res.status(200).json([{token : token},{user}]); 
    } catch (error) {
        //console.log(error);
        res.status(401).json(errorHandler(error));
    }
}

const logOut = (req,res)=>{
    console.log("-------")
    res.cookie("jwt","",{maxAge : 1}); 
    res.redirect("/");
}

const maxAge = 1 * 24 * 60 * 60; 
const createToken= (id) =>{
    return jwt.sign({ id },"smail li kayn",{
        expiresIn : maxAge
    }); 
}

const checkUser_Get = (req,res)=>{
    res.render("login");
}
module.exports={
    addUser,
    checkUser,
    logOut,
    checkUser_Get
}