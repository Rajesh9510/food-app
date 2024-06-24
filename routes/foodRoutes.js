const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware=require('../middlewares/adminMiddleware');
const { createFoodController, getAllFoodsController, getFoodByIdController, getFoodByResturantIdController, updateFoodByIdController,deleteFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const { route } = require("./testRoutes");
const routes=express.Router();

//create food
routes.post('/create',authMiddleware,createFoodController)
 
//getall food
routes.get('/getAll',getAllFoodsController)

//getfood by id
routes.get('/get/:id',getFoodByIdController)

//get food by resturant id
routes.get('/get/resturant/:id',getFoodByResturantIdController)

//update food by id
routes.put('/update/:id',authMiddleware,updateFoodByIdController)

//delete food
routes.delete('/delete/:id',authMiddleware,deleteFoodController)
module.exports=routes;

//place order
routes.post('/placeorder',placeOrderController)

//order status 
routes.post('/orderStatus/:id',adminMiddleware,authMiddleware,orderStatusController)