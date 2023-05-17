const mongoose=require('mongoose');
const objectId=mongoose.Schema.Types.ObjectId

const blogModel= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    Description:{
     type:String,
     required:true
    },
    thumbnail:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        ref:User,
        type:objectId,
        required:true,
    },
    isDeleted:{
       type:Boolean,
       default:false
    }
},{timestamps:true})

module.exports=mongoose.model("Blog",blogModel)