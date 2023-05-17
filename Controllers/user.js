const userModel = require("../Models/userModel")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")

const saltRounds=10;

const userController= async function(req,res){ 
    try{
        const data=req.body
    const {name,phone,email,password,address}=data

    // validation 
    if(!name) return res.status(400).send({status:false,message:"Name is required"})
    if(!phone) return res.status(400).send({status:false,message:"Phone is required"})
    if(!email) return res.status(400).send({status:false,message:"Email is required"})
    if(!password) return res.status(400).send({status:false,message:"Password is required"})
    data.password = bcrypt.hashSync(password, saltRounds)
    if(!address) return res.status(400).send({status:false,message:"Address is required"})
    
    // check user
    const existingUser= await userModel.findOne({email:email})

    // existing user
    if(existingUser) return res.status(200).send({status:false,message:"This Email user is already exist ,please Login"})
    
    const saveData= await userModel.create(data)
    return res.status(201).send({status:true, message:"register successful",saveData})
    }
    catch(err){
         return res.status(500).send({
            status:false, message:"Error in Registration",
            err
         })
    }

}

const loginController= async function(req,res){
    try{
    const data= req.body
    const {email,password}=data
    if(!email || !password)
     return res.status(400).send({status:false ,message:"Invalid Email or Password"})
    const user=await userModel.findOne({email:email})
    if(!user) return res.status(404).send({status:false,message:"email is not register"})
    bcrypt.compare(password,user.password, function(err, result){
        if(result){
            console.log("its match");
            const token=jwt.sign({
                userId:user._id,
                  iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //expiry time is 24 hours
                }, "authorblog")
                res.setHeader("x-api-key", token)
                let final={user:user,token:token}
                return res.status(200).send({status:true,message:"user login successful", final})
        }
        return res.status(400).send({status:false,message:"invalid credentials"})
    })

    }
    catch(error){
        return res.status(500).send({status:false,
        message:"Error in Login",
        error
    })
    }


}

module.exports={userController,loginController}