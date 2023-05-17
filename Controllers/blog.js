const mongoose = require("mongoose")
const userModel = require("../Models/userModel")
const blogModel = require("../Models/blogModel")


//<------------------------------------createBlog----------------------------------------------------------->//

const createBlog = async function (req, res) {
   try {
      let data = req.body
      const {title,Description,thumbnail,userId}=data
      if (Object.keys(data).length == 1) return res.status(404).send({ status: false, msg: "Provide some data" })
      //<---------------------------------validation----------------------------------------------------->//

      if (!title)
         return res.status(400).send({ status: false, msg: "title is mandatory" })
      if (typeof title != "string")
         return res.status(400).send({ status: false, msg: "Enter your valid Title" })
      let Title =title.trim()
      if (Title.length === 0)
         return res.status(400).send({ status: false, msg: "Enter your Title " })

      if (!Description)
         return res.status(400).send({ status: false, msg: "Description is mandatory" })
      if (typeof Description != "string")
         return res.status(400).send({ status: false, msg: "give some inputs " })
      let description = Description.trim()
      if (description.length == 0)
         return res.status(400).send({ status: false, msg: "Enter inputs at Description " })

      if (!userId)
         return res.status(400).send({ status: false, msg: "userId is mandatory" })
      if (typeof userId != "string")
         return res.status(400).send({ status: false, msg: "give valid userId " })
      if (!mongoose.isValidObjectId(userId))
         return res.status(400).send({ status: false, msg: "invalid user Id" })
      let authorId = await authorModel.findById({_id:userId})
      if (!authorId)
         return res.status(401).send({ status: false, msg: " Author not found " })
      if (req.userId != authorId)
         return res.status(400).send({ status: false, msg: "you are not allow" })

     
      //<----------------------createBlog------------------------------------------------->//
      let saveData = await blogModel.create(data)

      res.status(201).send({ status: true, data: saveData })
   } catch (err) {

      res.status(500).send({ status: false, msg: err.message })
   }
}

//<----------------------------------------getting blog--------------------------------------------------------------------->//

const getBlog = async function (req, res) {
   try {
      let query = req.query
      let allBlogs = await blogModel.find({ $and: [query, { isDeleted: false}] })
      if (allBlogs.length == 0) return res.status(404).send({ msg: "no such blog" })
      res.status(200).send({ status: true, data: allBlogs })
   }
   catch (error) {
      res.status(500).send({ status: false, msg: error.message })
   }

}
//<------------------------------------update Blog-------------------------------------------------------------------------------->//

const updateBlog = async function (req, res) {
   try {
      let data = req.body
      const {title,Description,thumbnail}=data
      //<---------------------------------validation-------------------------------------------------------------->//
      if(title){
         let newTitle = title.trim()
         if(newTitle.length==0) return res.status(400).send({status:false,msg:"give input properly"})
      }
      
      if(Description){
         let newDescription = Description.trim()
         if(newDescription.length==0) return res.status(400).send({status:false,msg:"give input properly"})
      }

     

      let validBlog = await blogModel.findOne({_id: blogId, isDeleted: false })
      if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "invalid blog Id" })
      if (!validBlog) return res.status(404).send({ status: false, msg: "no such Blog" })
      if (req.userId != authorId)
      return res.status(400).send({ status: false, msg: "you are not allow" })

      //<-----------------------------updateBlog----------------------------------------------------------->//
      let updateBlog = await blogModel.findOneAndUpdate({
         _id: blogId
      }, {
         $set: {
            title: title,
            Description:Description
         }
      }, {
         new: true
      })
      res.status(200).send({ status: true,message:"blog updated",data: updateBlog })
   }
   catch (err) {
      res.status(500).send({ status: false, msg: err.message })
   }
}

//<------------------------------------Delete Blog  by Id------------------------------------------------------------------------->//

const deleteBlogById = async function (req, res) {
   try {
      let blogid = req.params.blogId
      let findId = await blogModel.findOne({ _id: blogid, isDeleted: false }).select({ _id: 1 })
      if (!findId) {
         res.status(404).send({ status: false, msg: "no such blog" })
      }
      else {
         let updateDelete = await blogModel.findOneAndUpdate({ _id: findId._id }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
         res.status(200).send({ status: true, msg: "blog is deleted" })
      }
   }
   catch (err) {
      res.status(500).send({ status: false, msg: err.message })
   }
}
//<---------------------------------------deleteBlogByParams------------------------------------------------------------------->//




module.exports = {
   createBlog,
   getBlog,
   updateBlog,
   deleteBlogById
}