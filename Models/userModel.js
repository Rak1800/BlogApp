const mongoose=require('mongoose')

const userModel= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
     type:String,
     required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    address:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("User",userModel)