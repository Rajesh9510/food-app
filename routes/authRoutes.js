
const express=require("express");
const routes=express.Router();
const { registerController, loginController } = require("../controllers/authController");

//register router
routes.post('/register',registerController)

//login routes 
routes.post('/login',loginController)


module.exports=routes;