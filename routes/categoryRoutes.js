const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategory, getAllCategoryController, deleteCategoryController, updateCategoryController} = require("../controllers/categoryController");
const routes=express.Router();

//create category
routes.post('/create',authMiddleware,createCategory)

//getall category
routes.get('/getall',getAllCategoryController)

//update categoryDetails
routes.put('/update/:id',authMiddleware,updateCategoryController)

//delete category
routes.delete('/delete/:id',authMiddleware,deleteCategoryController)

module.exports=routes;