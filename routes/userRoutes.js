const express=require("express");
const { getUserController, updateUserController, updatePasswordController, deleteProfileController,  } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const routes=express.Router();

// Get User 
routes.get('/getUser',authMiddleware,getUserController)

//Update Profile
routes.put('/updateUser',authMiddleware,updateUserController)

//Update Password
routes.post('/updatePassword',authMiddleware,updatePasswordController)

//delete user
routes.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports=routes;