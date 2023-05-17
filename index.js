const express=require('express');
const mongoose =require('mongoose');
const multer=require("multer")
const route=require('./routes/route')



const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(multer().any())
app.use(express.static('public'));
app.use('/images', express.static('images'));
  

mongoose.connect('mongodb+srv://Rak18000:Rakesh123@cluster0.xntrj.mongodb.net/Blog-library',{
    useNewUrlParser:true
}).then(()=>console.log('mongoDb is connected')) 
.catch(err=>console.log(err))

app.use('/', route)



app.listen(5000,()=>console.log('express is running on port '+(5000)))