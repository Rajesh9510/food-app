const mongoose = require("mongoose")

const categorySchema=new mongoose.Schema(
    {
     title:{
        type:String,
        required:[true,'category title is required'],
     },
     imageUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Ffacultyprofile.raisoni.net%2F%3Fi%3D100-food-logo-design-ideas-best-food-logos-4-ll-xo8QowIN&psig=AOvVaw35GPyOiT5XXwyRNKMGEM4c&ust=1719037083305000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDMhbCG7IYDFQAAAAAdAAAAABAb"
     }
    },
    {timestamps:true}
);

module.exports=mongoose.model('category',categorySchema)