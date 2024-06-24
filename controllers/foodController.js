const foodsModel = require("../models/foodsModel")
const orderModel=require("../models/orderModel")

const createFoodController=async(req,res)=>{
    try {
        const {title,description,price,imageUrl,foodTags,category,code,isAvaliable,resturant,rating,ratingCount,}=req.body
        if(!title || !description || !price || !resturant){
            return res.status(404).send({
                success:false,
                message:'please provice title or description or price or resturant'
            })
        }
        const newFood=new foodsModel({
            title,description,price,imageUrl,foodTags,category,code,isAvaliable,resturant,rating,ratingCount,
        })
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'New Food Item Created',
            newFood,
        })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:'Error in the Createfood API'
      })  
    }
}


//getAll food 
const getAllFoodsController=async(req,res)=>{
    try {
        const foods=await foodsModel.find({})
        if(!foods){
            res.status(404).send({
                success:false,
                message:"there is not any food"
            })
        }
        await res.status(200).send({
            success:'true',
            totalFoods:foods.length,
            foods,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In The getAllFoods API'
        })
    }
}

//get singlefood by id
const getFoodByIdController=async(req,res)=>{
    try {
        const getFoodId =req.params.id;
        if(!getFoodId){
            return res.status(404).send({
                success:false,
                message:'Please Provide FoodId'
            })
        }
        const getFood=await foodsModel.findById(getFoodId)
        if(!getFood){
            res.status(500).send({
                success:false,
                message:'there is not any food avalible'
            })
        }
        res.status(200).send({
            success:true,
            getFood
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getFoodById API '
        })
    }
}

//get food by resturant id
const getFoodByResturantIdController=async(req,res)=>{
    try {
        const getResturantFoodId =req.params.id;
        if(!getResturantFoodId){
            return res.status(404).send({
                success:false,
                message:'Please Provide FoodId'
            })
        }
        const getResturantFood=await foodsModel.find({resturant:getResturantFoodId})
        if(!getResturantFood){
            res.status(500).send({
                success:false,
                message:'there is not any food avalible'
            })
        }
        res.status(200).send({
            success:true,
            getResturantFood
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getResturantFoodId API '
        })
    }
}

//update food by id
const updateFoodByIdController=async(req,res)=>{
    try {
        const getFoodId=req.params.id;
        if(!getFoodId){
            return res.status(404).send({
                success:false,
                message:'please provide food id'
            })
        }
        const food=await foodsModel.findById(getFoodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'there is not any food '
            })
        }
        const { title,description,price,resturant} = req.body;
        if (title) food.title = title;
        if (description) food.description = description;
        if(price)food.price=price;
        if(resturant) food.resturant=resturant
        //save user
        await food.save();
        res.status(200).send({
            success:true,
            message:'food is update succesfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in updateFoodById API'
        }) 
    }
}

//delete food using id
const deleteFoodController=async(req,res)=>{
    try {
        const foodId=req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'please provide foodId'
            })
        }
        const food=await foodsModel.findByIdAndDelete(foodId)
        if(!food){
            return res.send(404).send({
                success:false,
                message:'there is not any food'
            })
        }
        res.status(200).send({
            success:true,
            message:"food delete successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in deleteFoodController API'
        })
    }
}


//place order
const placeOrderController=async(req,res)=>{
try {
    const {cart}=req.body
    if(!cart){
        return res.status(500).send({
            success:false,
            message:'please food cart and payment'
        })
    }
    let total=0;
    cart.map((i)=>{
        total +=i.price
    })
    const newOrder=new orderModel({
        foods:cart,
        payment:total,
        buyer:req.body.id
    })
    await newOrder.save()
    res.status(201).send({
        success:true,
        message:"order place succesfully",
        newOrder
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in placeOrderController API',
        error
    })
}
}

//order status
const orderStatusController=async(req,res)=>
    {
        try {
            const orderId=req.params.id
            if(!orderId){
                return res.status(404).send({
                    success:false,
                    message:'please provide orderid'
                })
            }
            const {status}=req.body
            const order=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
            res.status(200).send({
                success:true,
                message:'order status updated'
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in orderStatusController API'
            })
        }
    }

module.exports={createFoodController,getAllFoodsController,getFoodByIdController,getFoodByResturantIdController,updateFoodByIdController,deleteFoodController,placeOrderController,orderStatusController}