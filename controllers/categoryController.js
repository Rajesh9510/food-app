const categoryModel = require("../models/categoryModel")

const createCategory=async(req,res)=>{
    try {
        const {title,imageUrl}=req.body
        if(!title){
            return res.status(500).send({
                success:false,
                message:'please provide category title or image'
            })
        }
        const newCategory=new categoryModel({title,imageUrl});
        await newCategory.save()
        res.status(201).send({
            success:true,
            message:'category created',
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:'please provide category title or image'
        })
    }
}

//getall category routes
const getAllCategoryController=async(req,res)=>{
    try {
        const category= await categoryModel.find({})
        if(!category)
            {
                return res.status(404).send({
                    success:false,
                    message:'category not avalible'
                })
            }
            res.status(200).send({
                success:true,
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GetAll Category API '
        })
    }
}

//update category
const updateCategoryController=async(req,res)=>{
try {
    const getCategoryId=req.params.id;
    if(!getCategoryId){
        res.status(404).send({
            success:false,
            message:'please provide category id'
        })
    }
    const category=await categoryModel.findById(getCategoryId)
    //update
    const { title,imageUrl} = req.body;
        if (title) category.title = title;
        if (imageUrl) category.imageUrl = imageUrl;
        //save user
        await category.save();
        res.status(200).send({
            success: true,
            message: "category Updated Succesafully",
        });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in UpdateCategoryController'
    })
}
}


//delete categorybyid
const deleteCategoryController=async(req,res)=>{
    try {
        const getCategoryId= await req.params.id;
        if(!getCategoryId)
            {
                res.status(404).send({
                    success:false,
                    message:'please provide categoryID'
                })
            }
            await categoryModel.findByIdAndDelete(getCategoryId)
            res.status(200).send({
                success:true,
                message:'category delete successfully'
            })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In DeleteCategory API'
        }) 
    }
}
module.exports={createCategory,getAllCategoryController,deleteCategoryController,updateCategoryController}