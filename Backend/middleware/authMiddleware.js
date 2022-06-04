const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authRequire = (req,res,next)=>{
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] 
  //const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,"smail li kayn",(err,decode)=>{
            if(err){
                console.log(err); 
                res.redirect("/users/login"); 
            }else {
                console.log(decode); 
                next(); 
            }
        }); 
    }else{
        res.redirect("/users/login");
    }
}

const getUserInfo = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                console.log(err); 
                res.locals.user=null; 
                next(); 
            }else {
                console.log(decode); 
                const user = await User.findById(decode.id);
                console.log(user.isAdmin);
                res.locals.user=user; 
                next();
               
                
            }
        }); 
    }else{
        res.locals.user=null; 
        next();
    }
}

const CheckAuthorisation = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    //const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                console.log(err); 
                res.locals.user=null; 
                res.redirect("/");
            }else {
                console.log(decode); 
                const user = await User.findById(decode.id);
                if(user.isAdmin){
                    res.locals.user=user; 
                    next();
                }
                else {
                    res.locals.user=null;
                    res.redirect("/");
                }
                
            }
        }); 
    }else{
        res.locals.user=null; 
        res.redirect("/"); 
    }
}

module.exports = {authRequire,getUserInfo,CheckAuthorisation};