const testController=(req,res)=>{
    try {
        res.status(200).send({
            success:true,
            message:'test user data API'
        })
    } catch (error) {
       console.log('error in this API is ',error) 
    }
}
module.exports={testController}