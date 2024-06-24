const restuarantModel = require("../models/restuarantModel");

const createRestuarantController=async(req,res)=>{
     try {
        const {title,imagUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body;
        //validation
        if(!title || !coords){
            return res.status(500).send({
                sucess:false,
                message:'please provide title and address'
            })
        }
        const newResturant=new restuarantModel({title,imagUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newResturant.save()
        res.status(201).send({
            sucess:true,
            message:'New Resturant Created Sucessfully'
        })
     } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:"Error In Create Restuarant API",
            error 
        })
     }
}



const getAllResturantController=async (req,res)=>{
try {
    const restuarants=await restuarantModel.find({})
    if(!restuarants){
        return res.status(404).send({
            success:false,
            message:'No Resturant Avalible'
        })
    }
    res.status(200).send({
        success:true,
        totalCount:restuarants.length,
        restuarants
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        sucess:false,
        message:'Error in getAll API',
        error
    })
}
}

//get resturantbyid
const getResturantById=async(req,res)=>{
try {
    const restuarantId=req.params.id;
    if(!restuarantId){
        return res.status(404).send({
            success:false,
            message:'please provide id'
        })
    }
    //find resturant 
    const restuarant=await restuarantModel.findById(restuarantId);
    if(!restuarant){
        return res.status(404).send({
            success:false,
            message:"please provide reaturantId",
        });
    }
    res.status(200).send({
        success:true,
        restuarant
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In getResturantById API'
    })
}
}

//delete resturant
const deleteRestuarantController=async(req,res)=>{
try {
    const resturantId = req.params.id
    if(!resturantId)
        {
            return res.status(404).send({
                success:false,
                message:'please provide id Or there is not any resturant'
            })
        }
        const restuarant=await restuarantModel.findByIdAndDelete(resturantId)
        res.status(200).send({
            success:true,
            message:'Restuarant Delete Successfully'
        })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Delete Resturant API"
    })
}
}
module.exports={createRestuarantController,getAllResturantController,getResturantById,deleteRestuarantController}