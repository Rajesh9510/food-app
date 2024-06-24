//authcontroller
const userModel=require("../models/userModel")
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken")
//register Controller
const registerController=async(req,res)=>{
   try {
    const {userName,email,password,phone,address}=req.body

    //validation
    if(!userName || !email ||!password ||!address ||!phone ){
        return res.status(500).send({
            success:false,
            message:'please provide all fields'
        })
    }

    //check user
  const existing = await userModel.findOne({email})
  if(existing){
    return res.status(500).send({
        success:false,
        message:'email already registerd please login'
    })
  }
  //hasing
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  //create new user
  const user=await userModel.create({
    userName,
    email,
    password:hashPassword,
    address,
    // usertype,
    phone,
  })
  res.status(201).send({
    success:true,
    message:'Sucessfully Registered',
    user
  });
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error In Register Api',
        error
    })
  }
}
//login controller
const loginController=async(req,res)=>{
  try {
    const {email,password}=req.body
    if(!email ||!password){
      res.status(500).send({
        success:false,
        message:"please enter email and password"
      })
    }
    //check User
    // const user= await userModel.findOne({email:email, password:password})
    const user= await userModel.findOne({email})
    if(!user)
      {
        return res.status(404).send({
          success:false,
          message:'User Not Found '
        })
      }
      //check user password | compare password
      const isMatch = await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(500).send({
          success:false,
          message:'invalid credentials',
        });
      }
      //token
      const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
      res.status(200).send({
        success:true,
        message:"login Sucessfully",
        user,
        token,
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"Error In Login Api"
    })
  }
}
module.exports={registerController,loginController} 