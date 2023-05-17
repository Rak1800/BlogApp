const { userController, loginController } = require("../Controllers/user")

const router=require("express").Router()

// user api
router.post("/register",userController)
router.post("/login",loginController)

// blog api
router.post("/newBlog")

module.exports=router