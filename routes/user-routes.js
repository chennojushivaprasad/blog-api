const express  = require( "express")
const {getAllUser,signup,login, deleteUser} = require("../controllers/user-controller")
const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.delete("/delete/:id",deleteUser)


module.exports = userRouter