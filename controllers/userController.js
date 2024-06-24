const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs")
//GET USER INFO
const getUserController = async (req, res) => {
    // res.status(200).send("User Data")
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //hide password
        user.password = undefined;
        //response
        res.status(200).send({
            success: true,
            message: "sucessfully data get",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error,
        });
    }
};

//Update User
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //update
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated Succesafully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update User API",
        });
    }
};

//Update password
const updatePasswordController=async(req,res)=>{
     try {
        //find user
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //get data from user
        const {oldPassword,newPassword}=req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"please provide Old or New Password"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
      if(!isMatch){
        return res.status(500).send({
          success:false,
          message:'Invalid Old Password',
        });
      }
      var salt=bcrypt.genSaltSync(10);
      const hashPassword=await bcrypt.hash(newPassword,salt);
      user.password=hashPassword
      await user.save()
      res.status(200).send({
        success:true,
        message:"password updated"
      });
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Password Update API',
            error,
        })
     }
}

//delete account
const deleteProfileController=async(req,res)=>{
 try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:'your account has been deleted'
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in delete profile API',
        error
    })
 }
}



module.exports = { getUserController, updateUserController,updatePasswordController,
deleteProfileController
 };
