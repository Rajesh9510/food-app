const mongoose = require("mongoose")

const foodsSchema=new mongoose.Schema(
    {
    title:{
        type:String,
        required:[true,'food title is required']
    },
    description:{
        type:String,
        required:[true,'food description is require']
    },
    price:{
        type:Number,
        required:[true,'food price is require']
    },
    imageUrl:{
        type:String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-png-vectors%2Ffood-logo&psig=AOvVaw2OlZBJSB_rUu6YvPoKlN09&ust=1719061665504000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDo9fHh7IYDFQAAAAAdAAAAABAE'
    },  
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvaliable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'restuarant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    },
    {timestamps:true}
);

module.exports=mongoose.model('foods',foodsSchema)