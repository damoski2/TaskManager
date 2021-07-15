const { db } = require('../server.js');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');



exports.signUp = (req,res)=>{
    
}


exports.signIn = (req,res)=>{
   
}


exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});
