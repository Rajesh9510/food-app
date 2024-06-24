const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestuarantController, getAllResturantController, getResturantById, deleteRestuarantController } = require("../controllers/restuarantController");
const routes=express.Router();


//create Restuarant
routes.post('/create',authMiddleware,createRestuarantController)

//getall resturant
routes.get('/getAll',getAllResturantController)

//get resturant details using Id
routes.get('/get/:id',getResturantById)

//delete restuarant 
routes.delete('/delete/:id',authMiddleware,deleteRestuarantController)
module.exports=routes;