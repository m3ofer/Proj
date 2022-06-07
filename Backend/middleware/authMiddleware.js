const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const authRequire = (req,res,next)=>{
   /* const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] */
  //const token = req.cookies.jwt;
  let rt=req.rawHeaders[9];
   
  rt=rt.substr(7)
  const token=rt; console.log("authMiddle authRequi :",token);
  console.log("AuthRreq authMidd ",rt);
    if(token){
        jwt.verify(token,"smail li kayn",(err,decode)=>{
            if(err){
                console.log("AuthReq errorif",err); 
                res.redirect("/users/login"); 
            }else {
                console.log("AuthReq if-else",decode); 
                next(); 
            }
        }); 
    }else{
        console.log("AuthReq ",decode); 
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
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    //const token = req.cookies.jwt;
    let rt=req.rawHeaders[9];
    console.log(req);
    console.log("########",rt); 
    if(rt.includes("application")){
        rt=req.rawHeaders[13];
    }   
    console.log("new rt :",rt);
    rt=rt.substr(7);
    
    const token=rt; console.log("authMiddle token :",token);
    console.log("req authMidd ",rt);
   
    if(token){
        jwt.verify(token,"smail li kayn",async (err,decode)=>{
            if(err){
                console.log(" auth midd error 1 ",err); 
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