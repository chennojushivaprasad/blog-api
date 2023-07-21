import express from "express";
import {getAllUser,signup,login, deleteUser} from "../controllers/user-controller.js"
const userRouter = express.Router();

userRouter.get("/",getAllUser);
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.delete("/delete/:id",deleteUser)


export default userRouter