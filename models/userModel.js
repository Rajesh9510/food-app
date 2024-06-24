const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,"phone number is required"]
    },
    // usertype:{
    //     type:String,
    //     required:[true,"user type is required"]
    // },
    profile:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
    }

},{timestamps:true})

module.exports=mongoose.model('User',userSchema)